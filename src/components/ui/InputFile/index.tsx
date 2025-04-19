import { Dispatch } from "react";

type Propstypes = {
    uploadedImage: File | null;
    name: string;
    setUploadedImage: Dispatch<React.SetStateAction<File | null>>
}

export default function InputFile(props: Propstypes) {
    const { uploadedImage, name, setUploadedImage } = props;
    return (
      <div className="">
        <label
          htmlFor={name}
          className="mt-3 mb-5 bg-primary text-white/80 flex flex-col items-center justify-center text-center gap-5 p-5 cursor-pointer rounded-xl border border-accent"
        >
          {uploadedImage?.name ? (
            <p>{uploadedImage.name}</p>
          ) : (
            <>
              <p>
                Upload a new image, Large image will be resized automatically
              </p>
              <p>
                Maximum upload size is <b className="font-extrabold text-accent">1 MB</b>
              </p>
            </>
          )}
        </label>
        <input
          type="file"
          name={name}
          id={name}
          className="opacity-0 absolute -z-10"
          onChange={(e: any) => {
            e.preventDefault();
            setUploadedImage(e.currentTarget.files[0]);
          }}
        />
      </div>
    );
}