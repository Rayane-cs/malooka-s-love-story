// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://lrmrtqpvjxaggojdfcss.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxybXJ0cXB2anhhZ2dvamRmY3NzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg3MjgyNDUsImV4cCI6MjA2NDMwNDI0NX0._baeGVCzLWhKOhjS7CrB461JHyofhAmvMz324vmE08E";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);