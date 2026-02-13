import { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../../firebase/config';
import { format } from 'date-fns';
import { Button } from '../../components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../../components/ui/table';

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  product: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved';
  createdAt: any;
};

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const inquiriesRef = ref(database, 'inquiries');

      const unsubscribe = onValue(inquiriesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const inquiriesData = Object.entries(data).map(([id, value]: [string, any]) => ({
            id,
            ...value
          })) as Inquiry[];

          // Sort by createdAt desc
          inquiriesData.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));

          setInquiries(inquiriesData);
        } else {
          setInquiries([]);
        }
        setLoading(false);
      }, (error) => {
        console.error('Error fetching inquiries:', error);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (error) {
      console.error('Error setting up Realtime Database listener:', error);
      setLoading(false);
    }
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
            New
          </span>
        );
      case 'in-progress':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
            In Progress
          </span>
        );
      case 'resolved':
        return (
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
            Resolved
          </span>
        );
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#07D185]"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#043F43]">Inquiries</h1>
        <p className="text-gray-600 mt-2">View and manage all contact form submissions</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Message</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inquiries.length > 0 ? (
                inquiries.map((inquiry) => (
                  <TableRow key={inquiry.id}>
                    <TableCell>
                      {inquiry.createdAt
                        ? format(new Date(inquiry.createdAt), 'MMM d, yyyy HH:mm')
                        : 'N/A'}
                    </TableCell>
                    <TableCell className="font-medium">{inquiry.name}</TableCell>
                    <TableCell>
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="text-[#07D185] hover:underline"
                      >
                        {inquiry.email}
                      </a>
                    </TableCell>
                    <TableCell>
                      {inquiry.phone ? (
                        <a
                          href={`tel:${inquiry.phone}`}
                          className="text-gray-700 hover:text-[#07D185]"
                        >
                          {inquiry.phone}
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </TableCell>
                    <TableCell>{inquiry.product || 'N/A'}</TableCell>
                    <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="line-clamp-2">
                        {inquiry.message}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    No inquiries found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
