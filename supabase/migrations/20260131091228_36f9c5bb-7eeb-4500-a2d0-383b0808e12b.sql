-- Update handle_new_user function to create profile and role from user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    -- Create profile from user metadata
    INSERT INTO public.profiles (user_id, full_name, nik, business_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        COALESCE(NEW.raw_user_meta_data->>'nik', ''),
        COALESCE(NEW.raw_user_meta_data->>'business_name', '')
    );
    
    -- Create user role from metadata
    INSERT INTO public.user_roles (user_id, role)
    VALUES (
        NEW.id,
        (NEW.raw_user_meta_data->>'role')::app_role
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Create trigger on auth.users (drop if exists first)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();