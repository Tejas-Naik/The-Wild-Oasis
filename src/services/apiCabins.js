import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase
        .from('cabins')
        .select('*');

    if (error) {
        console.error(error);
        throw new Error("Cabins data cound not be loaded");
    }
    return data;
}

export async function createCabin(newCabin) {
    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    const imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

    // https://hosscqnzlyvfnqwtrxiu.supabase.co/storage/v1/object/public/cabins/cabin-001.jpg
    // Create Cabin 
    const { data, error } = await supabase
        .from('cabins')
        .insert([{ ...newCabin, image: imagePath }])

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be created");
    }

    // 2. Upload image
    const {error: storageError} = await supabase.storage.
    from("cabins")
    .upload(imageName, newCabin.image)

    // 3. Delete the cabin if there was an error uploading image
    if (storageError){
        await supabase.from('cabins').delete().eq('id', data.id);
        
        console.error(storageError);
        throw new Error("Cabin image could not beuploaded and cabin was not created");
    }

    return data;
}

export async function deleteCabin(id) {

    const { data, error } = await supabase
        .from('cabins')
        .delete()
        .eq('id', id);

    if (error) {
        console.error(error);
        throw new Error("Cabin could not be deleted");
    }
    return data;

}