
'use server';

import { revalidatePath } from "next/cache";

// This file is intentionally sparse. 
// All data fetching and mutations are handled by API proxy routes in /src/app/api.
// We are only using this file for Next.js-specific server functions like revalidatePath if needed.
