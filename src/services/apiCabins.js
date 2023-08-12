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

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

    const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
    const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;

    console.log(imageName);
    console.log(imagePath);

    // 1. Create / Edit Cabin 
    let query = supabase.from("cabins");

    if (!id) {
        // A) CREATE
        query = query.insert([{ ...newCabin, image: imagePath }]);
    } else {
        // B) EDIT
        const { data: editData, error: editError } = await query
            .update({ ...newCabin, image: imagePath })
            .eq("id", id);

        if (editError) {
            console.error(editError);
            throw new Error("Cabin could not be edited");
        }
        // 2. Upload image
        const { error: storageError } = await supabase.storage
            .from("cabins")
            .upload(imageName, newCabin.image)

        return editData;
    }

    const { data, error } = await query.select();


    // 2. Upload image
    const { error: storageError } = await supabase.storage
        .from("cabins")
        .upload(imageName, newCabin.image)

    // 3. Delete the cabin if there was an error uploading image
    if (storageError) {
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