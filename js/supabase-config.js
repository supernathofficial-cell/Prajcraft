const SUPABASE_URL = 'https://hmcmhjbsdctewltwzizw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhtY21oamJzZGN0ZXdsdHd6aXp3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDI4MDYsImV4cCI6MjA5NzY3ODgwNn0.Bnphby9HfiZjqxpH5FH_LBq2MQZKqgBOMn4qIGny_Jc';

// Environment Variables
window.PAYPAL_CLIENT_ID = 'ATa-MqJ9614GvdqaS1ktca87wU3vvRgKqwt54pjzzTkDtUM95PnO6aV35fmFBWcVF8cW51VjA77mNR4f'; // Replace 'sb' with actual PayPal Client ID in production

// Initialize the Supabase client
window.supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Global Media Upload Utility
window.uploadMedia = async function (file) {
    if (!file) return null;
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await window.supabase.storage
        .from('media')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) {
        console.error('Upload Error:', error);
        throw error;
    }

    const { data: publicUrlData } = window.supabase.storage
        .from('media')
        .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
};
