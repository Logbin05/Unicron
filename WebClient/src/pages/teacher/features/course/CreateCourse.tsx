import { useState } from "react";
import { useForm } from "react-hook-form";
import { BiX, BiUpload } from "react-icons/bi";

import { Button } from "@components/button/button";
import { Fields } from "@components/fields/fields";
import { typeInput } from "@entities/ui/fields";
import { mockCategories } from "@mock/data";
import { typeButton } from "@entities/ui/button";
import type { CreateCourseForm } from "@entities/data/course";

export function CreateCoursePopUp({ close }: { close: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCourseForm>();

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  function onSubmit(data: CreateCourseForm) {
    const payload = {
      ...data,
      course_image: imageFile,
    };

    console.log("CREATE COURSE:", payload);
  }

  function handleImageChange(file: File | null) {
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }

  return (
    <div
      className="
        bg-fourth w-full max-w-[720px]
        max-h-[95vh]
        rounded-2xl
        p-4 sm:p-6
        flex flex-col gap-4 sm:gap-6
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl md:text-28 text-sixth font-Tektur">
          Create course
        </h2>

        <button
          onClick={close}
          className="text-sixth text-2xl sm:text-3xl hover:text-fifth transition"
        >
          <BiX />
        </button>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="
          flex flex-col gap-5
          overflow-y-auto pr-1
        "
      >
        {/* Image upload */}
        <div className="flex flex-col gap-2">
          <label className="text-fifth text-sm sm:text-base">
            Course cover
          </label>

          <label
            className="
              relative
              h-32 sm:h-40
              rounded-xl
              border-2 border-dashed border-fifth/40
              flex items-center justify-center
              cursor-pointer
              hover:border-fifth transition
            "
          >
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="absolute inset-0 w-full h-full object-cover rounded-xl"
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-fifth">
                <BiUpload className="text-2xl sm:text-3xl" />
                <span className="text-xs sm:text-sm">Upload image</span>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
            />
          </label>
        </div>

        {/* Fields */}
        <Fields<CreateCourseForm>
          register={register}
          errors={errors}
          className="
            grid grid-cols-1
            md:grid-cols-2
            gap-4
          "
          fields={[
            {
              name: "course_name",
              label: "Course title",
              type: typeInput.text,
              required: true,
              labelClassName: "text-fifth font-light text-sm",
              inputClassName:
                "border-2 border-gray-300 rounded-xl w-full px-3 py-2 focus:ring focus:border-third focus:ring-third",
            },
            {
              name: "course_slug",
              label: "Slug",
              type: typeInput.text,
              required: true,
              labelClassName: "text-fifth font-light text-sm",
              inputClassName:
                "border-2 border-gray-300 rounded-xl w-full px-3 py-2 focus:ring focus:border-third focus:ring-third",
            },
            {
              name: "course_desc",
              label: "Description",
              type: typeInput.text,
              required: true,
              labelClassName: "text-fifth font-light text-sm md:col-span-2",
              inputClassName:
                "border-2 border-gray-300 rounded-xl w-full px-3 py-2 h-28 sm:h-36 resize-none focus:ring focus:border-third focus:ring-third",
            },
            {
              name: "price",
              label: "Price",
              type: typeInput.number,
              required: true,
              labelClassName: "text-fifth font-light text-sm",
              inputClassName:
                "border-2 border-gray-300 rounded-xl w-full px-3 py-2 focus:ring focus:border-third focus:ring-third",
            },
          ]}
        />

        {/* Category */}
        <div className="flex flex-col gap-1">
          <label className="text-fifth text-sm sm:text-base">Category</label>

          <select
            {...register("category_id", { required: true })}
            className="
              bg-primary text-sixth
              px-3 py-2
              rounded-xl border border-fourth
              focus:border-fifth outline-none transition
            "
          >
            <option value="">Select category</option>
            {mockCategories.map((c) => (
              <option key={c.category_id} value={c.category_id}>
                {c.category_name}
              </option>
            ))}
          </select>

          {errors.category_id && (
            <span className="text-red-400 text-xs">Category is required</span>
          )}
        </div>

        {/* Publish */}
        <label className="flex items-center gap-3 text-fifth cursor-pointer text-sm sm:text-base">
          <input
            type="checkbox"
            {...register("is_published")}
            className="accent-fifth w-4 h-4 sm:w-5 sm:h-5"
          />
          Publish immediately
        </label>

        {/* Actions */}
        <div
          className="
            flex flex-col sm:flex-row
            justify-end gap-3 pt-2
          "
        >
          <Button
            type={typeButton.button}
            onClick={close}
            className="
              bg-secondary text-sixth
              px-4 py-2 rounded-sm
              w-full sm:w-auto
            "
          >
            Cancel
          </Button>

          <Button
            type={typeButton.submit}
            className="
              bg-fifth text-primary
              px-4 py-2 rounded-sm
              hover:bg-sixth
              w-full sm:w-auto
            "
          >
            Create course
          </Button>
        </div>
      </form>
    </div>
  );
}
