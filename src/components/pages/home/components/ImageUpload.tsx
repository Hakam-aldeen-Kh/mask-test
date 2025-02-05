import React from "react";
import Image from "next/image";

interface IImageUploadProps {
  label: string;
  images: (string | null)[];
  setImages: (images: (string | null)[]) => void;
}

const ImageUpload = ({ label, setImages, images }: IImageUploadProps) => {
  const compressImage = (
    file: File,
    maxWidth: number,
    maxHeight: number
  ): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new window.Image();
      const canvas = document.createElement("canvas");
      const reader = new FileReader();

      reader.onload = (event) => {
        img.src = event.target?.result as string;
        img.onload = async () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          let quality = 0.7;
          let base64 = "";
          do {
            base64 = canvas.toDataURL("image/jpeg", quality);
            quality -= 0.05;
          } while (base64.length > 50 * 1024 && quality > 0.1);

          resolve(base64);
        };
      };

      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64Image = await compressImage(file, 800, 800);
        const updatedImages = [...images];
        console.log(updatedImages)
        updatedImages[index] = base64Image;
        console.log(updatedImages)
        setImages(updatedImages);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleDelete = (index: number) => {
    console.log(images)
    const updatedImages = [...images];
    updatedImages[index] = null;
    setImages(updatedImages);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="flex flex-wrap items-center justify-center gap-5">
        {images.map((image, index) => (
          <div key={index} className="flex items-center gap-1">
            <div className="w-[225px] h-[140px] flex-1 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
              {!!image ? (
                <Image
                  src={image}
                  alt="Uploaded"
                  width={300}
                  height={150}
                  className="w-full h-full object-contain"
                />
              ) : (
                <label htmlFor={`file-input-${index}`} className="flex flex-col items-center justify-center cursor-pointer w-full h-full">
                  <Image
                    src="/images/icons/Image-Icon.svg"
                    alt="Upload Icon"
                    width={40}
                    height={40}
                  />
                </label>
              )}
            </div>
            
            {/* Input is now correctly referenced with an ID */}
            <input
              id={`file-input-${index}`}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(event) => handleImageChange(event, index)}
            />

            <div className="flex flex-col self-end gap-2">
              <button
                type="button"
                onClick={() => document.getElementById(`file-input-${index}`)?.click()}
                className="w-[24px] h-[24px] border border-[#DCDCDC] bg-white rounded-full flex items-center justify-center"
                aria-label="Edit image"
              >
                <Image
                  src="/images/icons/edit.svg"
                  alt="Edit"
                  width={11}
                  height={11}
                />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="w-[24px] h-[24px] border border-[#DCDCDC] bg-white rounded-full flex items-center justify-center"
                aria-label="Delete image"
              >
                <Image
                  src="/images/icons/trash.svg"
                  alt="Delete"
                  width={11}
                  height={11}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;




// import React, { useRef } from "react";
// import Image from "next/image";

// interface IImageUploadProps {
//   label: string;
//   images: (string | null)[];
//   setImages: (images: (string | null)[]) => void;
// }

// const ImageUpload = ({ label, setImages, images }: IImageUploadProps) => {
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const compressImage = (
//     file: File,
//     maxWidth: number,
//     maxHeight: number
//   ): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const img = new window.Image();
//       const canvas = document.createElement("canvas");
//       const reader = new FileReader();

//       reader.onload = (event) => {
//         img.src = event.target?.result as string;
//         img.onload = async () => {
//           let width = img.width;
//           let height = img.height;

//           if (width > maxWidth || height > maxHeight) {
//             const ratio = Math.min(maxWidth / width, maxHeight / height);
//             width *= ratio;
//             height *= ratio;
//           }

//           canvas.width = width;
//           canvas.height = height;
//           const ctx = canvas.getContext("2d");
//           ctx?.drawImage(img, 0, 0, width, height);

//           let quality = 0.7;
//           let base64 = "";
//           do {
//             base64 = canvas.toDataURL("image/jpeg", quality);
//             quality -= 0.05;
//           } while (base64.length > 50 * 1024 && quality > 0.1);

//           resolve(base64);
//         };
//       };

//       reader.onerror = (error) => reject(error);
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleImageChange = async (
//     event: React.ChangeEvent<HTMLInputElement>,index:number
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       try {
//         const base64Image = await compressImage(file, 800, 800);
//         setImages(...images,image[index]=base64Image);
//       } catch (error) {
//         console.error("Error compressing image:", error);
//       }
//     } else {
//       setImages(...images,image[index]=null);
//     }
//   };

//   const handleDelete = (index: number) => {
//     setImages(images.filter((_, i) => i !== index));
//   };
  
//   const triggerFileInput = () => fileInputRef.current?.click();

//   return (
//     <div className="space-y-2">
//       <label htmlFor="file-input" className="text-sm font-medium text-gray-700">
//         {label}
//       </label>
//       <div className="flex flex-wrap items-center justify-center gap-5">

//         <div className="flex items-center gap-1">
//           <div className="w-[225px] h-[140px] flex-1 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
//             {images[0] ? (
//               <Image
//                 src={images[0]}
//                 alt="Uploaded"
//                 width={300}
//                 height={150}
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <label
//                 htmlFor="file-input"
//                 className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
//               >
//                 <Image
//                   src="/images/icons/Image-Icon.svg"
//                   alt="Upload Icon"
//                   width={40}
//                   height={40}
//                 />
//               </label>
//             )}
//           </div>

//           <input
//             id="file-input"
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             name="image"
//             className="hidden"
//             onChange={handleImageChange(1)}
//           />

//           <div className="flex flex-col self-end gap-2">
//             <button
//               type="button"
//               onClick={triggerFileInput}
//               className="w-[24px] h-[24px] border border-[#DCDCDC] bg-white rounded-full flex items-center justify-center"
//               aria-label="Edit image"
//             >
//               <Image
//                 src="/images/icons/edit.svg"
//                 alt="Edit"
//                 width={11}
//                 height={11}
//               />
//             </button>
//             <button
//               type="button"
//               onClick={handleDelete}
//               className="w-[24px] h-[24px] border border-[#DCDCDC] bg-white rounded-full flex items-center justify-center"
//               aria-label="Delete image"
//             >
//               <Image
//                 src="/images/icons/trash.svg"
//                 alt="Delete"
//                 width={11}
//                 height={11}
//               />
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-1">
//           <div className="w-[225px] h-[140px] flex-1 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
//             {images[1] ? (
//               <Image
//                 src={images[1]}
//                 alt="Uploaded"
//                 width={300}
//                 height={150}
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <label
//                 htmlFor="file-input"
//                 className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
//               >
//                 <Image
//                   src="/images/icons/Image-Icon.svg"
//                   alt="Upload Icon"
//                   width={40}
//                   height={40}
//                 />
//               </label>
//             )}
//           </div>

//           <input
//             id="file-input"
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             name="image"
//             className="hidden"
//             onChange={handleImageChange}
//           />

//           <div className="flex flex-col self-end gap-2">
//             <button
//               type="button"
//               onClick={triggerFileInput}
//               className="w-[24px] h-[24px] border border-[#DCDCDC] bg-white rounded-full flex items-center justify-center"
//               aria-label="Edit image"
//             >
//               <Image
//                 src="/images/icons/edit.svg"
//                 alt="Edit"
//                 width={11}
//                 height={11}
//               />
//             </button>
//             <button
//               type="button"
//               onClick={handleDelete}
//               className="w-[24px] h-[24px] border border-[#DCDCDC] bg-white rounded-full flex items-center justify-center"
//               aria-label="Delete image"
//             >
//               <Image
//                 src="/images/icons/trash.svg"
//                 alt="Delete"
//                 width={11}
//                 height={11}
//               />
//             </button>
//           </div>
//         </div>

//         <div className="flex items-center gap-1">
//           <div className="w-[225px] h-[140px] flex-1 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center bg-gray-50">
//             {images[2] ? (
//               <Image
//                 src={images[2]}
//                 alt="Uploaded"
//                 width={300}
//                 height={150}
//                 className="w-full h-full object-contain"
//               />
//             ) : (
//               <label
//                 htmlFor="file-input"
//                 className="flex flex-col items-center justify-center cursor-pointer w-full h-full"
//               >
//                 <Image
//                   src="/images/icons/Image-Icon.svg"
//                   alt="Upload Icon"
//                   width={40}
//                   height={40}
//                 />
//               </label>
//             )}
//           </div>

//           <input
//             id="file-input"
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             name="image"
//             className="hidden"
//             onChange={handleImageChange}
//           />

//           <div className="flex flex-col self-end gap-2">
//             <button
//               type="button"
//               onClick={triggerFileInput}
//               className="w-[24px] h-[24px] border border-[#DCDCDC] bg-white rounded-full flex items-center justify-center"
//               aria-label="Edit image"
//             >
//               <Image
//                 src="/images/icons/edit.svg"
//                 alt="Edit"
//                 width={11}
//                 height={11}
//               />
//             </button>
//             <button
//               type="button"
//               onClick={handleDelete}
//               className="w-[24px] h-[24px] border border-[#DCDCDC] bg-white rounded-full flex items-center justify-center"
//               aria-label="Delete image"
//             >
//               <Image
//                 src="/images/icons/trash.svg"
//                 alt="Delete"
//                 width={11}
//                 height={11}
//               />
//             </button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ImageUpload;
