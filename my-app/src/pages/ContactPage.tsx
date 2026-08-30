import React, { useState } from 'react';

export const ContactPage: React.FC = () => {
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    inquiryType: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setFormData({ firstName: '', lastName: '', email: '', inquiryType: '', message: '' });
    }, 4000);
  };

  return (
    <div className="w-full pt-20 bg-[#f7f9fb] min-h-screen text-[#191c1e]">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-16 lg:py-24 w-full relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column: Form */}
          <div className="flex-1 space-y-12">
            <div className="space-y-4">
              <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#111827]">
                Initiate Contact.
              </h1>
              <p className="font-body-lg text-base sm:text-lg text-[#45464d] max-w-lg leading-relaxed">
                For corporate partnerships, statutory inquiries, or programmatic support, please use the secure channel below.
              </p>
            </div>

            {sent ? (
              <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                <h3 className="font-headline-md text-xl font-bold">Message Transmitted</h3>
                <p className="font-body-base text-sm">Thank you. Our Secretariat will respond within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="relative group">
                    <input
                      id="firstName"
                      type="text"
                      required
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-[#f2f4f6] text-[#191c1e] font-body-base text-base px-6 py-4 rounded-xl outline-none border-b-2 border-transparent focus:border-[#4b41e1] transition-all peer placeholder-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                    />
                    <label
                      htmlFor="firstName"
                      className="absolute left-6 top-4 text-[#64748B] font-body-base transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#4b41e1] peer-focus:bg-[#f7f9fb] px-1 peer-valid:-top-3 peer-valid:text-xs peer-valid:bg-[#f7f9fb]"
                    >
                      First Name
                    </label>
                  </div>

                  <div className="relative group">
                    <input
                      id="lastName"
                      type="text"
                      required
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-[#f2f4f6] text-[#191c1e] font-body-base text-base px-6 py-4 rounded-xl outline-none border-b-2 border-transparent focus:border-[#4b41e1] transition-all peer placeholder-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                    />
                    <label
                      htmlFor="lastName"
                      className="absolute left-6 top-4 text-[#64748B] font-body-base transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#4b41e1] peer-focus:bg-[#f7f9fb] px-1 peer-valid:-top-3 peer-valid:text-xs peer-valid:bg-[#f7f9fb]"
                    >
                      Last Name
                    </label>
                  </div>
                </div>

                <div className="relative group">
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="Corporate Email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#f2f4f6] text-[#191c1e] font-body-base text-base px-6 py-4 rounded-xl outline-none border-b-2 border-transparent focus:border-[#4b41e1] transition-all peer placeholder-transparent shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-6 top-4 text-[#64748B] font-body-base transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#4b41e1] peer-focus:bg-[#f7f9fb] px-1 peer-valid:-top-3 peer-valid:text-xs peer-valid:bg-[#f7f9fb]"
                  >
                    Corporate Email
                  </label>
                </div>

                <div className="relative group">
                  <select
                    id="inquiryType"
                    required
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-[#f2f4f6] text-[#191c1e] font-body-base text-base px-6 py-4 rounded-xl outline-none border-b-2 border-transparent focus:border-[#4b41e1] transition-all appearance-none cursor-pointer shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                  >
                    <option value="" disabled hidden>Nature of Inquiry</option>
                    <option value="csr">CSR Partnership &amp; Grants</option>
                    <option value="statutory">Statutory &amp; Compliance Audit</option>
                    <option value="program">Program Operations &amp; Centers</option>
                    <option value="other">General Inquiries</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-4 text-[#64748B] pointer-events-none">
                    expand_more
                  </span>
                </div>

                <div className="relative group">
                  <textarea
                    id="message"
                    rows={4}
                    required
                    placeholder="Message Details"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#f2f4f6] text-[#191c1e] font-body-base text-base px-6 py-4 rounded-xl outline-none border-b-2 border-transparent focus:border-[#4b41e1] transition-all peer placeholder-transparent resize-none shadow-[inset_0_2px_4px_rgba(0,0,0,0.02)]"
                  />
                  <label
                    htmlFor="message"
                    className="absolute left-6 top-4 text-[#64748B] font-body-base transition-all peer-focus:-top-3 peer-focus:text-xs peer-focus:text-[#4b41e1] peer-focus:bg-[#f7f9fb] px-1 peer-valid:-top-3 peer-valid:text-xs peer-valid:bg-[#f7f9fb]"
                  >
                    Message Details
                  </label>
                </div>

                <button
                  type="submit"
                  className="relative overflow-hidden px-8 py-4 bg-[#111827] text-white font-headline-md text-base rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.2)] transition-transform duration-300 ease-out hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3 group cursor-pointer"
                >
                  <span className="relative z-10">Transmit Message</span>
                  <span className="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Locations */}
          <div className="flex-1 space-y-8 flex flex-col justify-center">
            
            {/* Location Card 1 */}
            <div className="group bg-[#eceef0] rounded-3xl p-2 transition-transform duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="bg-white rounded-[20px] p-8 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] h-full flex flex-col relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-[#4b41e1]">
                    <span className="material-symbols-outlined">business</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-xl font-bold text-[#191c1e]">
                      Corporate Headquarters
                    </h3>
                    <p className="font-label-caps text-xs text-[#64748B] uppercase">
                      Tribeni, West Bengal
                    </p>
                  </div>
                </div>

                <div className="space-y-3 font-body-base text-sm text-[#45464d] mb-6">
                  <p className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#4b41e1] text-[20px] mt-0.5">location_on</span>
                    <span>Kanthaltala (near water tank), Tribeni-Mogra Road, PO Tribeni, Dist Hooghly 712503</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#4b41e1] text-[20px]">phone</span>
                    <span>+91 9143430927</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#4b41e1] text-[20px]">mail</span>
                    <span>tribeniminatifoundation@gmail.com</span>
                  </p>
                </div>

                <div className="w-full h-40 bg-slate-100 rounded-xl mt-auto overflow-hidden shadow-inner grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                  <img
                    src="/tmf-assets/real-field-photos/tmf-field-10.jpeg"
                    alt="Tribeni Headquarters"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Location Card 2 */}
            <div className="group bg-[#eceef0] rounded-3xl p-2 transition-transform duration-500 hover:-translate-y-2 relative overflow-hidden">
              <div className="bg-white rounded-[20px] p-8 shadow-[0_10px_25px_-5px_rgba(15,23,42,0.05)] h-full flex flex-col relative z-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-[#4b41e1]">
                    <span className="material-symbols-outlined">account_tree</span>
                  </div>
                  <div>
                    <h3 className="font-headline-md text-xl font-bold text-[#191c1e]">
                      Regional Operations
                    </h3>
                    <p className="font-label-caps text-xs text-[#64748B] uppercase">
                      Radhanagar, Dhaniakhali
                    </p>
                  </div>
                </div>

                <div className="space-y-3 font-body-base text-sm text-[#45464d] mb-6">
                  <p className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#4b41e1] text-[20px] mt-0.5">location_on</span>
                    <span>Field Office, Radhanagar, PO Gopinagar, PS Dhaniakhali 712402</span>
                  </p>
                  <p className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#4b41e1] text-[20px]">phone</span>
                    <span>+91 9832274345</span>
                  </p>
                </div>

                <div className="w-full h-32 bg-slate-100 rounded-xl mt-auto overflow-hidden shadow-inner grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                  <img
                    src="/tmf-assets/real-field-photos/tmf-field-22.jpeg"
                    alt="Radhanagar Regional Operations"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
