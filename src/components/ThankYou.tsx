import { useSelector } from "react-redux";

const ThankYou = () => {
  const formData = useSelector(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: any) => state.form
  );
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-4 shadow-md rounded-lg bg-white">
        <h1 className="text-4xl font-bold mb-8 text-center">Thank You!</h1>
        <p className="text-lg mb-8 text-center">
          Your application has been submitted successfully.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-bold mb-2">Full Name:</p>
            <p className="text-gray-700">
              {formData.firstName} {formData.lastName}
            </p>
          </div>
          <div>
            <p className="font-bold mb-2">Email:</p>
            <p className="text-gray-700">{formData.email}</p>
          </div>
          <div>
            <p className="font-bold mb-2">Address:</p>
            <p className="text-gray-700">{formData.address1}</p>
          </div>
          <div>
            <p className="font-bold mb-2">City:</p>
            <p className="text-gray-700">{formData.city}</p>
          </div>
          <div>
            <p className="font-bold mb-2">State:</p>
            <p className="text-gray-700">{formData.state}</p>
          </div>
          <div>
            <p className="font-bold mb-2">Zip:</p>
            <p className="text-gray-700">{formData.zip}</p>
          </div>
          <div>
            <p className="font-bold mb-2">Phone:</p>
            <p className="text-gray-700">{formData.phone}</p>
          </div>
          <div>
            <p className="font-bold mb-2">Job Title:</p>
            <p className="text-gray-700">{formData.jobTitle}</p>
          </div>
          {/* ... other fields ... */}
          <div className="col-span-2">
            <p className="font-bold mb-2">Reason for applying:</p>
            <p className="text-gray-700">{formData.reason}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
