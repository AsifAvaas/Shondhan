import { useState, useEffect } from "react";

const refineCaption = (caption) => {
  if (!caption) return "";
  let refinedCaption = caption.trim();
  refinedCaption =
    refinedCaption.charAt(0).toUpperCase() + refinedCaption.slice(1);
  if (!refinedCaption.endsWith(".")) {
    refinedCaption += ".";
  }
  return refinedCaption.replace(" ,", ",").replace("  ", " ");
};

function ImageCaptioningComponent() {
  const [images, setImages] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const validFiles = files.filter((file) => file.type.startsWith("image/"));
    if (validFiles.length === 0) {
      setError("Please upload valid image files");
      return;
    }

    const imageUrls = validFiles.map((file) => URL.createObjectURL(file));
    setImages(imageUrls);
    setCaptions(Array(validFiles.length).fill(""));
    setError(null);
    describeImages(validFiles);
  };

  const describeImages = async (imageFiles) => {
    setLoading(true);
    setError(null);

    const newCaptions = await Promise.all(
      imageFiles.map(async (file) => {
        try {
          const formData = new FormData();
          formData.append("file", file);

          const response = await fetch(
            "https://api-inference.huggingface.co/models/nlpconnect/vit-gpt2-image-captioning",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer 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`,
              },
              body: file,
            }
          );

          if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
          }

          const data = await response.json();
          return refineCaption(
            data[0]?.generated_text || "No caption generated."
          );
        } catch (error) {
          console.error("Error describing image:", error);
          return "Error generating caption.";
        }
      })
    );

    setCaptions(newCaptions);
    setLoading(false);
  };

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image));
    };
  }, [images]);

  return (
    <div className=" mx-5">
      {error && <div className="bg-red-100 p-4 mb-4 text-red-700">{error}</div>}
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="mb-4 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        disabled={loading}
      />
      <div className="flex flex-col gap-4 w-full">
        {images.map((image, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-4 p-4 rounded-lg shadow-md"
          >
            <img
              src={image}
              alt={`Uploaded ${index + 1}`}
              className="w-32 h-32 object-cover rounded-lg"
            />
            <div className="w-full">
              <h3 className="font-semibold">Caption</h3>
              <textarea
                className="w-full bg-gray-100 p-2 rounded resize-none"
                value={captions[index]}
                onChange={(e) => {
                  const newCaptions = [...captions];
                  newCaptions[index] = e.target.value;
                  setCaptions(newCaptions);
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageCaptioningComponent;
