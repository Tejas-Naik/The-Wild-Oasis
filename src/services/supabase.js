import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://hosscqnzlyvfnqwtrxiu.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhvc3NjcW56bHl2Zm5xd3RyeGl1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE0NzM4NDMsImV4cCI6MjAwNzA0OTg0M30.KdjffP8LqbncY1ampgSSwu3wVh8ewLVP9eKs5yHEq5U";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
