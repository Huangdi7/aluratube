import { createClient} from "@supabase/supabase-js";

const PROJECT_URL = "https://izgfllmjzglhdcpwuozl.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6Z2ZsbG1qemdsaGRjcHd1b3psIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTk0MjYsImV4cCI6MTk4NDAzNTQyNn0.kgoWP0u4d8Yz_FIOyRW8tUUxSNBCMfwvpcR04Ad2EQs"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*")
                
        }
    }
}