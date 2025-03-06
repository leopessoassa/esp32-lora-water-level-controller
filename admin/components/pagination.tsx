"use client";

import { IPagination } from "@/models/http/Pagination";
import { useState } from "react";

export default function Pagination() {
    const [pagination, setPagination] = useState<IPagination>({
        page: 1,
        size: 10,
      });
}