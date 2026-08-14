"use client";

import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactInfo() {
  return (
    <div className="bg-[#161616] p-8 sm:p-12 lg:p-14 text-[#EAE3D2] flex flex-col justify-between space-y-10">
      {/* Title and Subtext */}
      <div className="space-y-5">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#EAE3D2] uppercase leading-[1.15] font-sans">
          CONTACT
          <br />
          INFORMATION
        </h1>

        <p className="text-[#EAE3D2] text-xs sm:text-sm leading-relaxed font-sans max-w-[360px]">
          Whether you need a quote, have questions about our services, or
          want to discuss an upcoming project, our team is ready to help.
        </p>
      </div>

      {/* Contact Details List */}
      <div className="space-y-6 font-sans">
        {/* Phone */}
        <a
          href="tel:+919606596849"
          className="flex items-center gap-3.5 group cursor-pointer w-fit"
        >
          <FaPhoneAlt className="w-4 h-4 text-[#056826] shrink-0 group-hover:scale-110 transition-transform" />
          <span className="text-[#EAE3D2] group-hover:text-[#056826] font-semibold text-sm sm:text-base transition-colors">
            +91 - 96065 96849
          </span>
        </a>

        {/* Email */}
        <a
          href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@vikasiteco.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 group cursor-pointer w-fit"
        >
          <FaEnvelope className="w-4 h-4 text-[#056826] shrink-0 group-hover:scale-110 transition-transform" />
          <span className="text-[#EAE3D2] group-hover:text-[#056826] font-medium text-sm sm:text-base transition-colors">
            contact@vikasiteco.com
          </span>
        </a>

        {/* Registered Office */}
        <div className="flex items-start gap-3.5 pt-1">
          <FaMapMarkerAlt className="w-4 h-4 text-[#056826] shrink-0 mt-1" />
          <div className="space-y-1">
            <h3 className="font-semibold text-[#EAE3D2] text-base">
              Registered Office
            </h3>
            <p className="text-[#C8C8C8] text-xs sm:text-sm leading-relaxed max-w-[340px]">
              2- 93/ 4 , Kavoor Govt College Road,
              <br />
              Shankara Nagara, Mangalore - 575015.
            </p>
          </div>
        </div>

        {/* Manufacturing Unit */}
        <div className="pl-7 space-y-1 pt-1">
          <h3 className="font-semibold text-[#EAE3D2] text-base">
            Manufacturing Unit
          </h3>
          <p className="text-[#EAE3D2] text-xs sm:text-sm leading-relaxed max-w-[340px]">
            #32, 3rd cross, Bommasandra Industrial
            <br />
            Area, Electronicity Bangalore - 560078
          </p>
        </div>
      </div>
    </div>
  );
}
