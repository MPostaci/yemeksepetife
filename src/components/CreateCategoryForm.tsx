import { ChangeEvent, useState } from "react";
import { useCategoryStore } from "../stores/useCategoryStore";
import { motion } from "framer-motion";
import { Loader, PlusCircle, Upload } from "lucide-react";


const CreateCategoryForm = () => {
  const [newCategory, setNewCategory] = useState({
		name: "",
		description: "",
		imageFile: null as File | null,
	});

  const { addCategory, loading } = useCategoryStore();


  
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
	const file = e.target.files?.[0];
	if (file) {
	  setNewCategory((prev) => ({ ...prev, imageFile: file }));
	}
  };
	
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
	e.preventDefault();
  
	const formData = new FormData();
	formData.append("name", newCategory.name);
	formData.append("description", newCategory.description);
	if (newCategory.imageFile) {
	  formData.append("imageFile", newCategory.imageFile);
	}
  
	try {
	  // Pass formData instead of newCategory object
	  await addCategory(formData);
	  setNewCategory({ name: "", description: "", imageFile: null})
	} catch (error) {
	  console.log("Adding category failed:", error);
	}
  };
  
  
  return (
		<motion.div
			className='bg-gray-800 shadow-lg rounded-lg p-8 mb-8 max-w-xl mx-auto'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.8 }}
		>
			<h2 className='text-2xl font-semibold mb-6 text-purple-300'>Yeni Ürün Oluştur</h2>

			<form onSubmit = {handleSubmit} className='space-y-4'>
				<div>
					<label htmlFor='name' className='block text-sm font-medium text-gray-300'>
						Kategori Adı
					</label>
					<input
						type='text'
						id='name'
						name='name'
						value={newCategory.name}
						onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
						className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2
						 px-3 text-white focus:outline-none focus:ring-2
						focus:ring-purple-500 focus:border-purple-500'
						required
					/>
				</div>

				<div>
					<label htmlFor='description' className='block text-sm font-medium text-gray-300'>
						Açıklama
					</label>
					<textarea
						id='description'
						name='description'
						value={newCategory.description}
						onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            className='mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm
						 py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 
						 focus:border-purple-500'
						required
					/>
				</div>
				<div className='mt-1 flex items-center'>
					<input type='file' id='image' className='sr-only' accept='image/*' onChange={handleImageChange} />
					<label
						htmlFor='image'
						className='cursor-pointer bg-gray-700 py-2 px-3 border border-gray-600 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
					>
						<Upload className='h-5 w-5 inline-block mr-2' />
						Resim Ekle
					</label>
					{newCategory.imageFile && <span className='ml-3 text-sm text-gray-400'>Image uploaded </span>}
				</div>

				<button
					type='submit'
					className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
					shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 
					focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50'
					disabled={loading}
				>
					{loading ? (
						<>
							<Loader className='mr-2 h-5 w-5 animate-spin' aria-hidden='true' />
							Loading...
						</>
					) : (
						<>
							<PlusCircle className='mr-2 h-5 w-5' />
							Ürün Oluştur
						</>
					)}
				</button>
			</form>
		</motion.div>
	);
}

export default CreateCategoryForm