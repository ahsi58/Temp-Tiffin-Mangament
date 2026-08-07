import { useEffect, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { getVendorProfile, updateVendorProfile } from "../../api/userApi";
import Button from "../../components/common/Button";
import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import toast from "react-hot-toast";

function VendorProfile() {

    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState({
        businessName: "",
        ownerName: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: "",
        state: "",
        pincode: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const response = await getVendorProfile();
            setProfile(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: value
        }));

    };

    const handleSave = async () => {

        try {

            setSaving(true);

            const updateRequest = {
                businessName: profile.businessName,
                ownerName: profile.ownerName,
                phoneNumber: profile.phoneNumber,
                address: profile.address,
                city: profile.city,
                state: profile.state,
                pincode: profile.pincode,
                profileImage: profile.profileImage
            };

            await updateVendorProfile(updateRequest);

            await loadProfile();

            toast.success("Profile updated successfully!");

        } catch (error) {

            console.error(error);

            toast.error("Failed to update profile.");

        } finally {

            setSaving(false);

        }

    };

    if (!profile) {
        return (
            <DashboardLayout>
                <p className="text-gray-600">Loading profile...</p>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>

            <div className="max-w-4xl mx-auto">

                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    My Profile
                </h1>

                <Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <Input
                            label="Buisness Name"
                            name="businessName"
                            value={profile.businessName}
                            onChange={handleChange}
                        />

                        <Input
                            label="Owner Name"
                            name="ownerName"
                            value={profile.ownerName}
                            onChange={handleChange}
                        />

                        <Input
                            label="Email"
                            name="email"
                            value={profile.email}
                            readOnly
                        />

                        <Input
                            label="Phone"
                            name="phoneNumber"
                            value={profile.phoneNumber}
                            onChange={handleChange}
                        />

                        <Input
                            label="Address"
                            name="address"
                            value={profile.address}
                            onChange={handleChange}
                        />

                        <Input
                            label="City"
                            name="city"
                            value={profile.city}
                            onChange={handleChange}
                        />

                        <Input
                            label="State"
                            name="state"
                            value={profile.state}
                            onChange={handleChange}
                        />

                        <Input
                            label="Pincode"
                            name="pincode"
                            value={profile.pincode}
                            onChange={handleChange}
                        />

                    </div>
                    <div className="mt-8 flex justify-end">

                        <Button
                            onClick={handleSave}
                            loading={saving}
                        >
                            Save Changes
                        </Button>
                    </div>

                </Card>

            </div>

        </DashboardLayout>
    );
}

// function ProfileField({
//         label,
//         name,
//         value,
//         onChange,
//         readOnly = false
//     }) {

//         return (

//             <div>

//                 <label className="block text-sm font-medium text-gray-600 mb-2">
//                     {label}
//                 </label>

//                 <input
//                     type="text"
//                     name={name}
//                     value={value || ""}
//                     onChange={onChange}
//                     readOnly={readOnly}
//                     className={`w-full border rounded-lg px-4 py-2 ${
//                         readOnly
//                             ? "bg-gray-100"
//                             : "bg-white"
//                     }`}
//                 />

//             </div>

//         );

//     }

export default VendorProfile;