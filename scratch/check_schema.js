const { createClient } = require('@supabase/supabase-js');
const SUPABASE_URL = 'https://hmcmhjbsdctewltwzizw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtY21oamJzZGN0ZXdsdHd6aXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDI4MDYsImV4cCI6MjA5NzY3ODgwNn0.Bnphby9HfiZjqxpH5FH_LBq2MQZKqgBOMn4qIGny_Jc';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function check() {
    const { data, error } = await supabase.from('products').select('*').limit(1);
    if (error) console.error(error);
    else if (data && data.length > 0) {
        console.log(Object.keys(data[0]));
    } else {
        console.log("No data found, can't infer schema.");
    }
}
check();
