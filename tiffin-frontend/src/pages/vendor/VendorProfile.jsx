import { useEffect, useState } from "react";

import {
    Store,
    UserRound,
    Mail,
    Phone,
    MapPin,
    Building2,
    Map,
    Hash,
    Save
} from "lucide-react";

import DashboardLayout from "../../components/layout/DashboardLayout";

import {
    getVendorProfile,
    updateVendorProfile
} from "../../api/userApi";

import Button from "../../components/common/Button";
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


    // ============================================================
    // Load vendor profile
    // ============================================================

    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        try {

            const response =
                await getVendorProfile();

            setProfile(response.data);

        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to load profile."
            );

        }

    };


    // ============================================================
    // Handle input changes
    // ============================================================

    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;


        setProfile(prev => ({

            ...prev,

            [name]: value

        }));

    };


    // ============================================================
    // Save profile
    // ============================================================

    const handleSave = async () => {

        try {

            setSaving(true);


            const updateRequest = {

                businessName:
                    profile.businessName,

                ownerName:
                    profile.ownerName,

                phoneNumber:
                    profile.phoneNumber,

                address:
                    profile.address,

                city:
                    profile.city,

                state:
                    profile.state,

                pincode:
                    profile.pincode,

                profileImage:
                    profile.profileImage

            };


            await updateVendorProfile(
                updateRequest
            );


            await loadProfile();


            toast.success(
                "Profile updated successfully!"
            );


        } catch (error) {

            console.error(error);

            toast.error(
                "Failed to update profile."
            );


        } finally {

            setSaving(false);

        }

    };


    // ============================================================
    // Loading state
    // ============================================================

    if (!profile) {

        return (

            <DashboardLayout>

                <div className="min-h-[400px] flex items-center justify-center">

                    <p className="text-sm text-gray-500">
                        Loading profile...
                    </p>

                </div>

            </DashboardLayout>

        );

    }


    return (

        <DashboardLayout>

            <div className="max-w-5xl mx-auto space-y-6">


                {/* ==================================================
                    Header
                   ================================================== */}

                <div className="bg-gradient-to-r from-orange-500 to-orange-400 rounded-2xl px-6 py-5 text-white shadow-md">

                    <div className="flex items-center gap-3">

                        <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">

                            <Store size={23} />

                        </div>


                        <div>

                            <p className="text-xs font-semibold tracking-wider text-orange-100 uppercase">
                                VENDOR ACCOUNT
                            </p>

                            <h1 className="text-2xl md:text-3xl font-bold">
                                My Profile
                            </h1>

                            <p className="text-sm text-orange-50 mt-1">
                                Manage your business and contact information.
                            </p>

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    Profile Summary
                   ================================================== */}

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-5">

                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                        <div className="w-14 h-14 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">

                            <Store
                                size={28}
                                className="text-orange-500"
                            />

                        </div>


                        <div className="flex-1">

                            <h2 className="text-lg font-bold text-gray-900">

                                {profile.businessName ||
                                    "Your Business"}

                            </h2>

                            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-1">

                                <div className="flex items-center gap-1.5 text-xs text-gray-500">

                                    <UserRound size={13} />

                                    {profile.ownerName ||
                                        "Owner"}

                                </div>


                                <div className="flex items-center gap-1.5 text-xs text-gray-500">

                                    <Mail size={13} />

                                    {profile.email ||
                                        "Email"}

                                </div>

                            </div>

                        </div>


                        <span className="self-start sm:self-auto bg-green-50 text-green-700 border border-green-100 px-3 py-1.5 rounded-full text-[11px] font-bold">

                            Vendor Account

                        </span>

                    </div>

                </div>


                {/* ==================================================
                    Business Information
                   ================================================== */}

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">


                    {/* Section Header */}

                    <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">

                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">

                            <Building2
                                size={17}
                                className="text-orange-500"
                            />

                        </div>

                        <div>

                            <h2 className="text-base font-bold text-gray-900">
                                Business Information
                            </h2>

                            <p className="text-xs text-gray-500 mt-0.5">
                                Update your business and owner details.
                            </p>

                        </div>

                    </div>


                    <div className="p-5">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                            <Input
                                label="Business Name"
                                name="businessName"
                                value={
                                    profile.businessName
                                }
                                onChange={
                                    handleChange
                                }
                            />


                            <Input
                                label="Owner Name"
                                name="ownerName"
                                value={
                                    profile.ownerName
                                }
                                onChange={
                                    handleChange
                                }
                            />


                            <Input
                                label="Email"
                                name="email"
                                value={
                                    profile.email
                                }
                                readOnly
                            />


                            <Input
                                label="Phone"
                                name="phoneNumber"
                                value={
                                    profile.phoneNumber
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    Address Information
                   ================================================== */}

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">


                    {/* Section Header */}

                    <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">

                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center">

                            <MapPin
                                size={17}
                                className="text-orange-500"
                            />

                        </div>

                        <div>

                            <h2 className="text-base font-bold text-gray-900">
                                Business Address
                            </h2>

                            <p className="text-xs text-gray-500 mt-0.5">
                                Keep your business location information up to date.
                            </p>

                        </div>

                    </div>


                    <div className="p-5">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                            <Input
                                label="Address"
                                name="address"
                                value={
                                    profile.address
                                }
                                onChange={
                                    handleChange
                                }
                            />


                            <Input
                                label="City"
                                name="city"
                                value={
                                    profile.city
                                }
                                onChange={
                                    handleChange
                                }
                            />


                            <Input
                                label="State"
                                name="state"
                                value={
                                    profile.state
                                }
                                onChange={
                                    handleChange
                                }
                            />


                            <Input
                                label="Pincode"
                                name="pincode"
                                value={
                                    profile.pincode
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>

                    </div>

                </div>


                {/* ==================================================
                    Save
                   ================================================== */}

                <div className="bg-white border border-gray-200 rounded-xl shadow-sm px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                    <div>

                        <p className="text-sm font-semibold text-gray-800">
                            Profile changes
                        </p>

                        <p className="text-xs text-gray-500 mt-0.5">
                            Save your latest business information.
                        </p>

                    </div>


                    <Button
                        onClick={handleSave}
                        loading={saving}
                    >

                        <span className="flex items-center gap-2">

                            <Save size={16} />

                            Save Changes

                        </span>

                    </Button>

                </div>

            </div>

        </DashboardLayout>

    );

}


export default VendorProfile;

