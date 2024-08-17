import { useDispatch, useSelector } from "react-redux"
import logo from "../assets/images/logo.png"
import {
    Button, CircularProgress
    // , Menu, MenuItem
} from "@mui/material"
import axios from "axios"
import { baseUrl } from "../core"
import { logout } from "../redux/user"
import { useEffect, useState } from "react"
import moment from "moment"
import { useNavigate } from "react-router-dom"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import React from "react"

const MyReservations = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const currentUser = useSelector((state: any) => state?.user)
    const isSelectedEnglish = !currentUser?.isSelectedUrdu

    const stripe: any = useStripe();
    const elements = useElements();

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [reservations, setReservations] = useState<any>(null)
    const [loadingIds, setLoadingIds] = useState<string[]>([])
    const [ids, setIds] = useState<string[]>([])

    useEffect(() => {
        getReservations()
    }, [])

    const _logout = async () => {

        try {

            await axios.post(`${baseUrl}/api/v1/logout`, {}, { withCredentials: true })

            dispatch(logout())

        } catch (error) {
            console.error(error)
        }

    }

    const getReservations = async () => {

        try {
            setIsLoading(true)
            const resp = await axios.get(`${baseUrl}/api/v1/user-reservations`, {
                withCredentials: true
            })

            setReservations(resp?.data?.data)
            setIsLoading(false)

        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }
    }

    const cancelReservation = async (id: string, status: boolean) => {

        if (!id || id?.trim() === "") return
        if (status) return

        try {

            setLoadingIds([...loadingIds, id])

            await axios.delete(`${baseUrl}/api/v1/user-reservation/${id}`, {
                withCredentials: true
            })

            setLoadingIds(loadingIds.filter((_id: string) => _id !== id))

            getReservations()

        } catch (error: any) {
            console.error(error)
        }

    }

    const handleChange = (id: string) => {

        if (!id || id?.trim() === "") return

        if (ids?.includes(id)) {
            const newIds = ids.filter(existingId => existingId !== id);
            setIds(newIds);
        } else {
            const newIds = [...ids, id]
            setIds(newIds)
        }

    }

    const pay = async () => {

        if (!ids?.length) return

        try {

            setIsLoading(true)

            const resp = await axios.post(`${baseUrl}/api/v1/create-payment-intent`, {
                passengersIds: ids
            }, { withCredentials: true })

            const secret = resp?.data?.clientSecret

            const cardElement = elements?.getElement(CardElement);
            const { paymentIntent, error }: any = await stripe?.confirmCardPayment(secret, {
                payment_method: {
                    card: cardElement,
                },
            });
            if (error) {
                console.error(error)
            } else if (paymentIntent.status === 'succeeded') {
                updateUsers([...ids])
            }

            setIsLoading(false)
            setIds([])

        } catch (error) {
            console.error(error)
            setIsLoading(false)
        }

    }

    const updateUsers = async (passengerIds: string[]) => {

        if (!passengerIds?.length) return

        try {

            await axios.post(`${baseUrl}/api/v1/update-passengers`, {
                passengersIds: ids
            }, { withCredentials: true })

            getReservations()

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <>
            <>
                <div className="w-full h-fit flex justify-between items-center p-4 px-8 bg-[#070B15]">
                    <img src={logo} alt="logo"
                        className="w-[80px] h-[80px] object-cover object-center rounded-full"
                    />
                    <div className="w-fit flex justify-end items-center gap-4">
                        <p className="w-fit text-left text-[#fff] font-bold">{currentUser?.userName}</p>
                        <Button onClick={_logout}
                            sx={{
                                background: "#0099ff",
                                padding: "24px"
                            }}
                            variant="contained" color="primary"
                        >{isSelectedEnglish ? "Logout" : "لاگ آؤٹ کریں"}</Button>
                    </div>
                </div>
            </>
            <>
                <div className="w-full flex justify-between items-center pr-16">
                    <div className="mt-8 w-fit flex items-center px-8 gap-2 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <p className="text-[40px] text-[#fff] font-bold text-left"
                        >{`<`}</p>
                        <p className="text-[32px] text-[#fff] font-bold text-left"
                        >{isSelectedEnglish ? "Back To Homepage" : "ہوم پیج پر واپس"}</p>
                    </div>
                    {
                        ids?.length ? <Button
                            onClick={pay}
                            variant="contained" color="secondary"
                            disabled={isLoading} sx={{ marginTop: "3em", width: "8em" }}
                        >{isSelectedEnglish ? "Pay" : "ادائیگی کریں"}</Button> : null
                    }
                </div>
                {
                    ids?.length ? <div className="bg-[#fff] p-4 w-[90%] mx-auto mt-8">
                        <CardElement />
                    </div> : null
                }
                {
                    reservations ?

                        reservations?.length ?

                            <>
                                <div className="p-8">
                                    <table border={1} className="w-full h-full overflow-y-auto border-1 border border-[#ccc]">
                                        <tr className="border border-b border-[#ccc]">
                                            <th></th>
                                            <th className="p-[8px] py-[12px] text-[20px] text-[#fff] font-normal">{isSelectedEnglish ? "Passenger Name" : "مسافر کا نام"}</th>
                                            <th className="p-[8px] py-[12px] text-[20px] text-[#fff] font-normal">{isSelectedEnglish ? "Departure" : "روانگی"}</th>
                                            <th className="p-[8px] py-[12px] text-[20px] text-[#fff] font-normal">{isSelectedEnglish ? "Arrival" : "آمد"}</th>
                                            <th className="p-[8px] py-[12px] text-[20px] text-[#fff] font-normal">{isSelectedEnglish ? "Departure Time" : "روانگی کا وقت"}</th>
                                            <th className="p-[8px] py-[12px] text-[20px] text-[#fff] font-normal">{isSelectedEnglish ? "Arrival Time" : "آمد کا وقت"}</th>
                                            <th className="p-[8px] py-[12px] text-[20px] text-[#fff] font-normal">{isSelectedEnglish ? "Seat Number" : "سیٹ نمبر"}</th>
                                            <th className="p-[8px] py-[12px] text-[20px] text-[#fff] font-normal">{isSelectedEnglish ? "Payment" : "ادائیگی"}</th>
                                            <th className="p-[8px] py-[12px] text-[20px] text-[#fff] font-normal">{isSelectedEnglish ? "Actions" : "اعمال"}</th>
                                        </tr>
                                        {reservations?.map((reservation: any, i: number) => (
                                            <tr className="border-b-2 border-b-[#fff]" key={i}>
                                                <td className="text-center p-4 text-[20px] text-[#fff]"><input type="checkbox"
                                                    onChange={() => handleChange(reservation?._id)}
                                                    disabled={reservation?.isPaid}
                                                    className="cursor-pointer"
                                                /></td>
                                                <td className="text-center p-4 text-[20px] text-[#fff]">{`${reservation?.firstName} ${reservation?.lastName}`}</td>
                                                <td className="text-center p-4 text-[20px] text-[#fff]">{reservation?.route?.origin}</td>
                                                <td className="text-center p-4 text-[20px] text-[#fff]">{reservation?.route?.destination}</td>
                                                <td className="text-center p-4 text-[20px] text-[#fff]">{moment.utc(reservation?.route?.departureTime).format('LLL')}</td>
                                                <td className="text-center p-4 text-[20px] text-[#fff]">{moment.utc(reservation?.route?.arrivalTime).format('LLL')}</td>
                                                <td className="text-center p-4 text-[20px] text-[#fff]">{reservation?.seatNumber}</td>
                                                <td className="text-center p-4 text-[20px] text-[#fff]">
                                                    <p className={`${reservation?.isPaid ? "bg-[#28A745]" : "bg-[#D61717]"} w-[100px] h-[33px] rounded-[100px] flex justify-center items-center text-[#fff] text-center text-sm mx-auto p-4`}>{reservation?.isPaid ? `${isSelectedEnglish ? "Paid" : "مکمل"}` : `${isSelectedEnglish ? "Unpaid" : "نا مکمل"}`}</p>
                                                </td>
                                                <td className="text-center p-4 text-[20px] text-[#fff]">
                                                    <Button
                                                        disabled={reservation?.isPaid}
                                                        variant="contained"
                                                        onClick={() => cancelReservation(reservation?._id, reservation?.isPaid)}
                                                    >{loadingIds?.includes(reservation?._id) ?
                                                        <>{isSelectedEnglish ? "Loading..." : "...جاری ہے"}</>
                                                        : (isSelectedEnglish ? "Cancel" : "منسوخ کریں")}</Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </table>
                                </div>
                            </>

                            :

                            <>
                                <h1
                                    className="w-full text-center text-[32px] font-bold text-[#fff] mt-[6em]"
                                >{isSelectedEnglish ? "No Reservations..." : "... کوئی تحفظات نہیں"}</h1>
                            </>

                        :
                        <>
                            <div className="w-full h-full mt-[8em] flex justify-center items-center">
                                <CircularProgress color="primary" />
                            </div>
                        </>
                }
            </>
        </>
    )
}

export default MyReservations