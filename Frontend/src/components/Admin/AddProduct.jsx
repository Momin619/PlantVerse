import { useState } from "react";
import { useForm } from "react-hook-form";
import { api } from "../../services/api/api";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";
import { Navbar } from "../ui/Navbar";
import { useNavigate } from "react-router-dom";
const AddProduct = () => {
  const redirect = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("stock", data.stock);
      formData.append("description", data.description);
      formData.append("image", data.image[0]);

      const res = await api.post("/admin/add-product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!");
      reset(); // Reset form

      // Redirect to admin dashboard
      redirect("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add product ❌");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex my-14 items-center justify-center bg-gray-100 p-4">
        <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-center text-green-700 mb-6">
            Add Product
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                {...register("name", { required: "Product name is required" })}
                placeholder="Enter product name"
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.name
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-green-500 focus:ring-2 focus:ring-green-400"
                }`}
              />
              {errors.name && (
                <p className="text-red-500 font-bold">{errors.name.message}</p>
              )}
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                {...register("stock", {
                  required: "Stock is required",
                  min: { value: 0, message: "Stock cannot be negative" },
                })}
                placeholder="Enter stock quantity"
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none ${
                  errors.stock
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-green-500 focus:ring-2 focus:ring-green-400"
                }`}
              />
              {errors.stock && (
                <p className="text-red-500 font-bold">{errors.stock.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Enter product description"
                className={`mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none resize-none ${
                  errors.description
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-green-500 focus:ring-2 focus:ring-green-400"
                }`}
                rows={4}
              />
              {errors.description && (
                <p className="text-red-500 font-bold">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Image
              </label>
              <input
                type="file"
                {...register("image", {
                  required: "Product image is required",
                })}
                accept="image/*"
                className={`mt-1 w-full px-2 py-1 border rounded-lg focus:outline-none ${
                  errors.image
                    ? "border-red-500 focus:ring-2 focus:ring-red-400"
                    : "border-green-500 focus:ring-2 focus:ring-green-400"
                }`}
              />
              {errors.image && (
                <p className="text-red-500 font-bold">{errors.image.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="cursor-pointer w-full py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition"
            >
              {isSubmitting ? "Submitting..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
