import { supabase, isSupabaseConfigured } from "./supabase";

function generateShareId() {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 9)
  ).toLowerCase();
}

// Mock localStorage storage for development
const STORAGE_KEY = "cassettes_mock_db";

function getMockDb() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveMockDb(cassettes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cassettes));
}

export async function createCassette({
  sender_email,
  receiver_email,
  song_url,
  message,
}) {
  const share_id = generateShareId();

  if (isSupabaseConfigured) {
    // Use Supabase
    const { data, error } = await supabase
      .from("cassettes")
      .insert([
        {
          sender_email,
          receiver_email,
          song_url,
          message,
          share_id,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } else {
    // Use localStorage mock
    const cassette = {
      id: Date.now(),
      sender_email,
      receiver_email,
      song_url,
      message,
      share_id,
      created_at: new Date().toISOString(),
    };
    
    const cassettes = getMockDb();
    cassettes.push(cassette);
    saveMockDb(cassettes);
    
    return cassette;
  }
}

export async function getCassetteByShareId(shareId) {
  if (isSupabaseConfigured) {
    // Use Supabase
    const { data, error } = await supabase
      .from("cassettes")
      .select("*")
      .eq("share_id", shareId)
      .single();

    if (error) throw error;
    return data;
  } else {
    // Use localStorage mock
    const cassettes = getMockDb();
    const cassette = cassettes.find(c => c.share_id === shareId);
    
    if (!cassette) {
      throw new Error("Cassette not found");
    }
    
    return cassette;
  }
}