"use client";

import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  UserPlus,
  UserX,
} from "lucide-react";

const headerItems = [
  {
    label: "Total Customers",
    value: 1200,
    icon: <Users className="w-6 h-6 text-white" />,
    bgClass: "cbg4",
  },
  {
    label: "Active Customers",
    value: 980,
    icon: <UserCheck className="w-6 h-6 text-white" />,
    bgClass: "cbg3",
  },
  {
    label: "New Signups",
    value: 45,
    icon: <UserPlus className="w-6 h-6 text-white" />,
    bgClass: "cbg5",
  },
  {
    label: "Banned Customers",
    value: 12,
    icon: <UserX className="w-6 h-6 text-white" />,
    bgClass: "cbg1",
  },
];

function CustomerHeader() {
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

export default CustomerHeader;
