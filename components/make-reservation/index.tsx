"use client";

import {
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  TextInput,
} from "flowbite-react";
import { Clock } from "lucide-react";
import { useForm } from "react-hook-form";

interface MakeReservationProps {
  handleClose: () => void;
  open: boolean;
  handleSubmit: (data: MakeReservationState) => void;
  loading?: boolean;
}

interface MakeReservationState {
  email: string;
  firstName: string;
  lastName: string;
  noOfGuests: string | number;
  phoneNumber: string;
  reservationDate: string;
  reservationTime: string;
}

export function MakeReservation({
  handleClose,
  open,
  handleSubmit,
  loading,
}: MakeReservationProps) {
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm<MakeReservationState>();

  const onSubmit = (data: MakeReservationState): void => {
    handleSubmit(data);
  };

  return (
    <>
      <Modal show={open} size="md" onClose={handleClose} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleFormSubmit(onSubmit)}>
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Book your reservation in advance
              </h3>
              <div className="block sm:flex items-center sm:space-x-2">
                <div className="block w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="firstName" value="First name" />
                  </div>
                  <TextInput
                    className="w-full mb-2 sm:mb-0"
                    id="firstName"
                    placeholder="Enter your first name"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div className="block w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="lastName" value="Last name" />
                  </div>
                  <TextInput
                    className="w-full"
                    id="lastName"
                    placeholder="Enter your last name"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  id="email"
                  placeholder="name@company.com"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="phoneNumber" value="Phone number" />
                </div>
                <TextInput
                  id="phoneNumber"
                  placeholder="Enter your phone number"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-xs">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="noOfGuests" value="No of Guests" />
                </div>
                <TextInput
                  id="noOfGuests"
                  placeholder="Enter no of guests"
                  {...register("noOfGuests", {
                    required: "Number of guests is required",
                  })}
                />
                {errors.noOfGuests && (
                  <p className="text-red-500 text-xs">
                    {errors.noOfGuests.message}
                  </p>
                )}
              </div>
              <div className="block sm:flex items-center sm:space-x-2">
                <div className="block w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="reservationDate" value="Reservation Date" />
                  </div>
                  <TextInput
                    type="date"
                    id="reservationDate"
                    className="w-full mb-2 sm:mb-0"
                    min={new Date().toISOString().split("T")[0]} // Disable past dates
                    {...register("reservationDate", {
                      required: "Reservation date is required",
                    })}
                  />
                  {errors.reservationDate && (
                    <p className="text-red-500 text-xs">
                      {errors.reservationDate.message}
                    </p>
                  )}
                </div>
                <div className="block w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="reservationTime" value="Reservation Time" />
                  </div>
                  <TextInput
                    type="time"
                    id="reservationTime"
                    className="w-full"
                    {...register("reservationTime", {
                      required: "Reservation time is required",
                    })}
                    rightIcon={() => <Clock size={15} />}
                  />
                  {errors.reservationTime && (
                    <p className="text-red-500 text-xs">
                      {errors.reservationTime.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="w-full flex items-center justify-center">
                <Button className="min-w-[200px]" color="dark" type="submit">
                  {loading ? (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  ) : (
                    "Book reservation"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}
