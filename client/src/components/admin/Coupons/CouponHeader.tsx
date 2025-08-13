"use client";

import { motion } from "framer-motion";
import {
  Ticket,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const headerItems = [
  {
    label: "Total Coupons",
    value: 120,
    icon: <Ticket className="w-6 h-6 text-white" />,
    bgClass: "cbg4",
  },
  {
    label: "Active Coupons",
    value: 85,
    icon: <CheckCircle className="w-6 h-6 text-white" />,
    bgClass: "cbg3",
  },
  {
    label: "Expired Coupons",
    value: 25,
    icon: <Clock className="w-6 h-6 text-white" />,
    bgClass: "cbg5",
  },
  {
    label: "Disabled Coupons",
    value: 10,
    icon: <XCircle className="w-6 h-6 text-white" />,
    bgClass: "cbg1",
  },
];

function CouponHeader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {headerItems.map((item, index) => (
        <motion.div
          key={index}
          className="relative rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <div
            className={`flex items-center gap-4 rounded-2xl p-5 ${item.bgClass}`}
          >
            <div className="p-3 rounded-full">{item.icon}</div>
            <div>
              <p className="text-white/80 text-sm">{item.label}</p>
              <p className="text-2xl font-semibold text-white">
                {item.value}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default CouponHeader;
