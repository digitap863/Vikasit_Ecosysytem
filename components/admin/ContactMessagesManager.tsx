"use client";

import { useEffect, useState, useCallback } from "react";

export interface ContactInquiryItem {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  newsletter: boolean;
  product?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ContactMessagesManager() {
  const [inquiries, setInquiries] = useState<ContactInquiryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedInquiry, setSelectedInquiry] = useState<ContactInquiryItem | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchInquiries = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/admin/contact");
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries(data.data || []);
      } else {
        setError(data.error || "Failed to load contact inquiries.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to fetch inquiries.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchInquiries();
  }, [fetchInquiries]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      setDeletingId(id);
      const res = await fetch(`/api/admin/contact/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setInquiries((prev) => prev.filter((item) => item._id !== id));
        if (selectedInquiry?._id === id) {
          setSelectedInquiry(null);
        }
      } else {
        alert(data.error || "Failed to delete message.");
      }
    } catch (err: any) {
      alert("Error deleting message: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredInquiries = inquiries.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      search === "" ||
      item.name.toLowerCase().includes(search) ||
      item.email.toLowerCase().includes(search) ||
      (item.phone && item.phone.toLowerCase().includes(search)) ||
      item.message.toLowerCase().includes(search) ||
      (item.product && item.product.toLowerCase().includes(search))
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Search Bar */}
      <div className="flex flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs font-bold text-neutral-600">
          Total Inquiries: <span className="text-[#056826] font-extrabold">{inquiries.length}</span>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="Search messages by name, email, phone, product..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-md border border-neutral-300 px-3 py-1.5 text-xs font-medium focus:border-[#056826] focus:outline-none sm:w-72"
          />
          <button
            type="button"
            onClick={fetchInquiries}
            className="rounded-md border border-neutral-300 bg-neutral-50 px-3 py-1.5 text-xs font-bold text-neutral-700 hover:bg-neutral-100"
          >
            Refresh
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center text-xs font-semibold text-neutral-500">
          Loading contact messages...
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="rounded-xl border border-neutral-200 bg-white p-12 text-center text-sm font-semibold text-neutral-500">
          No contact messages found.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Messages Table */}
          <div className={`${selectedInquiry ? "lg:col-span-7" : "lg:col-span-12"} transition-all`}>
            <div className="overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] font-bold uppercase tracking-wider text-neutral-600">
                    <tr>
                      <th className="px-4 py-3">Sender</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Inquiry / Topic</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {filteredInquiries.map((item) => {
                      const isSelected = selectedInquiry?._id === item._id;
                      return (
                        <tr
                          key={item._id}
                          onClick={() => setSelectedInquiry(item)}
                          className={`cursor-pointer transition-colors ${
                            isSelected ? "bg-[#edf6ef]/60" : "hover:bg-neutral-50"
                          }`}
                        >
                          <td className="px-4 py-3 font-bold text-neutral-900">
                            {item.name}
                          </td>
                          <td className="px-4 py-3 text-[11px] text-neutral-700 font-medium">
                            {item.email}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-[11px] font-bold text-[#056826]">
                            {item.phone ? (
                              <a
                                href={`tel:${item.phone}`}
                                onClick={(e) => e.stopPropagation()}
                                className="hover:underline"
                              >
                                {item.phone}
                              </a>
                            ) : (
                              <span className="text-neutral-400 font-normal">N/A</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {item.product && (
                              <span className="mb-1 inline-block rounded bg-[#056826]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#056826]">
                                {item.product}
                              </span>
                            )}
                            <div className="line-clamp-1 max-w-xs text-neutral-700">
                              {item.message}
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-[11px] text-neutral-500">
                            {new Date(item.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>
                          <td className="whitespace-nowrap px-4 py-3 text-right">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(item._id);
                              }}
                              disabled={deletingId === item._id}
                              className="rounded p-1 text-neutral-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                              title="Delete Message"
                            >
                              <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Selected Message Detail Drawer/Panel */}
          {selectedInquiry && (
            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-4 rounded-xl border border-neutral-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
                      Message Details
                    </span>
                    <h3 className="text-base font-bold text-neutral-900">{selectedInquiry.name}</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedInquiry(null)}
                    className="rounded-md p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700"
                  >
                    x
                  </button>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-bold text-neutral-500">Email: </span>
                    <a
                      href={`mailto:${selectedInquiry.email}`}
                      className="font-bold text-[#056826] underline"
                    >
                      {selectedInquiry.email}
                    </a>
                  </div>

                  <div>
                    <span className="font-bold text-neutral-500">Phone Number: </span>
                    {selectedInquiry.phone ? (
                      <a
                        href={`tel:${selectedInquiry.phone}`}
                        className="font-bold text-[#056826] underline"
                      >
                        {selectedInquiry.phone}
                      </a>
                    ) : (
                      <span className="font-semibold text-neutral-400">Not provided</span>
                    )}
                  </div>

                  <div>
                    <span className="font-bold text-neutral-500">Submitted: </span>
                    <span className="text-neutral-800">
                      {new Date(selectedInquiry.createdAt).toLocaleString()}
                    </span>
                  </div>

                  {selectedInquiry.product && (
                    <div>
                      <span className="font-bold text-neutral-500">Inquiry Product: </span>
                      <span className="inline-block rounded bg-[#056826]/10 px-2 py-0.5 text-xs font-bold text-[#056826]">
                        {selectedInquiry.product}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="font-bold text-neutral-500">Newsletter Subscription: </span>
                    <span className="font-bold text-neutral-800">
                      {selectedInquiry.newsletter ? "Subscribed ✅" : "No"}
                    </span>
                  </div>

                  <div className="pt-2">
                    <span className="mb-2 block font-bold text-neutral-500">Message Content:</span>
                    <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 text-xs leading-relaxed text-neutral-800 whitespace-pre-wrap max-h-64 overflow-y-auto">
                      {selectedInquiry.message}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={() => handleDelete(selectedInquiry._id)}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-bold text-red-700 transition-colors hover:bg-red-100 cursor-pointer"
                  >
                    <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Message
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
