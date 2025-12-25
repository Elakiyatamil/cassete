-- Enable RLS on cassettes table if not already enabled
ALTER TABLE public.cassettes ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anyone to insert cassettes" ON public.cassettes;
DROP POLICY IF EXISTS "Allow anyone to view cassettes" ON public.cassettes;
DROP POLICY IF EXISTS "Allow anyone to select cassettes" ON public.cassettes;

-- Create policy to allow anyone to insert cassettes
CREATE POLICY "allow_insert_cassettes" 
  ON public.cassettes 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow anyone to view cassettes (select)
CREATE POLICY "allow_select_cassettes"
  ON public.cassettes
  FOR SELECT
  USING (true);
