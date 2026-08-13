import { useRef, useState } from "react";
import { heicTo } from "heic-to";

function PhotoUploader({ onPhotoReady }) {
  const inputRef = useRef(null);

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;

    setError("");
    setLoading(true);

    try {
      console.log("Selected file:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      const fileName = file.name.toLowerCase();

      const isHEIC =
        file.type === "image/heic" ||
        file.type === "image/heif" ||
        fileName.endsWith(".heic") ||
        fileName.endsWith(".heif");

      let imageBlob = file;

     if (isHEIC) {
  console.log("HEIC detected. Converting...");

  const converted = await heicTo({
    blob: file,
    type: "image/jpeg",
    quality: 0.92,
  });

  imageBlob = converted;

  console.log("HEIC conversion successful:", imageBlob);
}

      const imageUrl = URL.createObjectURL(imageBlob);

      const image = new Image();

      image.onload = () => {
        console.log("Image loaded:", {
          width: image.naturalWidth,
          height: image.naturalHeight,
        });

        setPreview(imageUrl);

        onPhotoReady({
          file: imageBlob,
          url: imageUrl,
          width: image.naturalWidth,
          height: image.naturalHeight,
          type: imageBlob.type,
        });

        setLoading(false);
      };

      image.onerror = () => {
        URL.revokeObjectURL(imageUrl);

        setError(
          "The converted image could not be displayed."
        );

        setLoading(false);
      };

      image.src = imageUrl;
    } catch (err) {
      console.error("IMAGE PROCESSING ERROR:", err);

      setError(
        err?.message ||
          "We couldn't process this photo. Please try another image."
      );

      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      handleFile(file);
    }
  };

  const openFilePicker = () => {
    inputRef.current?.click();
  };

  return (
    <div className="photo-uploader">
      <input
        ref={inputRef}
        type="file"
        accept="
          image/jpeg,
          image/png,
          image/heic,
          image/heif,
          .jpg,
          .jpeg,
          .png,
          .heic,
          .heif
        "
        onChange={handleChange}
        hidden
      />

      {!preview ? (
        <button
          type="button"
          className="upload-box"
          onClick={openFilePicker}
          disabled={loading}
        >
          <span className="upload-icon">+</span>

          <span className="upload-title">
            {loading
              ? "PROCESSING PHOTO..."
              : "UPLOAD YOUR PHOTO"}
          </span>

          <span className="upload-subtitle">
            JPG · PNG · HEIC
          </span>
        </button>
      ) : (
        <div className="photo-preview">
          <img
            src={preview}
            alt="Uploaded preview"
          />

          <button
            type="button"
            className="change-photo"
            onClick={openFilePicker}
          >
            CHANGE PHOTO
          </button>
        </div>
      )}

      {error && (
        <p className="upload-error">
          {error}
        </p>
      )}
    </div>
  );
}

export default PhotoUploader;