'use client'
import { PrimaryButton } from "@/components/unknown/CustomButton";
import { BaseInput } from "@/components/unknown/CustomForms";
import { useUserContext } from "@/contexts/UserContext";
import { Address } from "@/types/Address";
import { useState } from "react";

export default function AddAddress() {
    const [address, setAddress] = useState<Address>({
        firstName: "",
        lastName: "",
        phoneNumber: 0,
        country: "",
        city: "",
        region: "",
        streetAddress: "",
        streetAddressSecond: "",
        ZIP: ""
    });
    const userContext = useUserContext()
    const handleChange = (field: keyof Address, value: string) => {
        setAddress(prevAddress => ({ ...prevAddress, [field]: value }))
    }

    const handleAddUserAddress = async () => {
        await userContext.fetchAddUserAddress(address)
    }   

    return (
        <div>
            <BaseInput
                value={address.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
                placeholder="Enter first name"
            />
            <BaseInput
                value={address.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
                placeholder="Enter last name"
            />
            <BaseInput
                value={address.phoneNumber}
                onChange={(e) => handleChange("phoneNumber", e.target.value)}
                placeholder="Enter phone number"
            />
            <BaseInput
                value={address.country}
                onChange={(e) => handleChange("country", e.target.value)}
                placeholder="Enter country"
            />
            <BaseInput
                value={address.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Enter city"
            />
            <BaseInput
                value={address.region}
                onChange={(e) => handleChange("region", e.target.value)}
                placeholder="Enter region"
            />
            <BaseInput
                value={address.streetAddress}
                onChange={(e) => handleChange("streetAddress", e.target.value)}
                placeholder="Enter street address"
            />
            <BaseInput
                value={address.streetAddressSecond}
                onChange={(e) => handleChange("streetAddressSecond", e.target.value)}
                placeholder="Enter second street address"
            />
            <BaseInput
                value={address.ZIP}
                onChange={(e) => handleChange("ZIP", e.target.value)}
                placeholder="Enter ZIP code"
            />
            <PrimaryButton onClick={() => handleAddUserAddress()}>Add user address</PrimaryButton>
        </div>
    );
}
