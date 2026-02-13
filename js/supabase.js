const SUPABASE_URL = "https://aphdefijlpnyrqahcbtt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_j_HM2l4xtFcEpFcNg1LJMA_NdtiyfRy";

const { createClient } = supabase;

const supabaseClient = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);
