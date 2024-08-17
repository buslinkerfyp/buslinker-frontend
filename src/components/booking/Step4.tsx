import { ThemeProvider } from "@emotion/react";
import { theme } from "../../mui/theme";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import busImage from "../../assets/images/bus-emoji.svg"
import moment from "moment";
import { Button } from "@mui/material";
import axios from "axios";
import { baseUrl } from "../../core";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

const Step4 = ({ _data }: any) => {

    const navigate = useNavigate()
    const stripe: any = useStripe();
    const elements = useElements();

    const isDarkMode = useSelector((state: any) => state?.user?.isDarkTheme)
    const isSelectedEnglish = !useSelector((state: any) => state?.user?.isSelectedUrdu)

    const [paymentLoading, setPaymentLoading] = useState<boolean>(false);

    const [clientSecret, setClientSecret] = useState<any>(null);

    useEffect(() => {
        payment()
    }, [])

    const payment = async () => {

        const ids = _data?.passengerIds

        if (!ids?.length) return

        const resp = await axios.post(`${baseUrl}/api/v1/create-payment-intent`, {
            passengersIds: ids
        }, { withCredentials: true })

        setClientSecret(resp?.data?.clientSecret)

    }

    const handleSumbit = async (e: any) => {
        e?.preventDefault();
        setPaymentLoading(true);
        const cardElement = elements?.getElement(CardElement);
        const { paymentIntent, error }: any = await stripe?.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            },
        });
        if (error) {
            console.error(error)
            setPaymentLoading(false);
        } else if (paymentIntent.status === 'succeeded') {
            setPaymentLoading(false);
            updateUsers()
        }
    };

    const updateUsers = async () => {

        const ids = _data?.passengerIds

        if (!ids?.length) return

        try {

            await axios.post(`${baseUrl}/api/v1/update-passengers`, {
                passengersIds: ids
            }, { withCredentials: true })

            navigate("/my-reservations")

        } catch (error) {
            console.error(error)
        }

    }

    return (
        <ThemeProvider theme={theme} >
            <>
                <>
                    <div className={`w-full h-screen flex flex-col gap-8 p-8 bg-[${isDarkMode ? "0a101d" : "#fff"}]`}>
                        <>
                            <h1 className={`capitalize w-full text-[${isDarkMode ? "#fff" : "#353535"}] ${isSelectedEnglish ? "text-left" : "text-right"} text-[40px] font-bold`}>
                                {isSelectedEnglish ? "Pay for your trip" : "اپنے سفر کے لیے ادائیگی کریں۔"}
                            </h1>
                            <div className={`w-full border-b-2 border-b-[${isDarkMode ? "#fff" : "#0a101d"}]`}></div>
                            <h1 className={`capitalize w-full mt-8 text-[${isDarkMode ? "#fff" : "#0a101d"}] ${isSelectedEnglish ? "text-left" : "text-right"} text-[32px] font-bold`}>
                                {isSelectedEnglish ? "Booking Summary" : "بکنگ کا خلاصہ"}
                            </h1>
                            <>
                                <div className="w-full flex justify-center items-start gap-4">
                                    <>
                                        <div className="flex flex-col gap-4">
                                            <div className={`flex ${isSelectedEnglish ? "justify-start" : "justify-end"} items-center gap-4 font-bold text-[${isDarkMode ? "#fff" : "#0a101d"}]`}>
                                                <img src={busImage} alt="bus"
                                                    className="w-[120px] h-[120px] object-contain object-center"
                                                />
                                                {
                                                    isSelectedEnglish ? `${_data?.bus?.origin} to ${_data?.bus?.destination} ( Basic )`
                                                        : `${_data?.bus?.destination} سے ${_data?.bus?.origin} ( بنیادی )`
                                                }
                                            </div>
                                            <>
                                                {
                                                    isSelectedEnglish ?
                                                        <>
                                                            <table>
                                                                <tr>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-left`}>{isSelectedEnglish ? "Departure" : "روانگی"}</td>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-left`}>{moment(_data?.bus?.departureTime).format("lll")}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-left`}>{isSelectedEnglish ? "Arrival" : "آمد"}</td>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-left`}>{moment(_data?.bus?.arrivalTime).format("lll")}</td>
                                                                </tr>
                                                            </table>
                                                        </>
                                                        :
                                                        <>
                                                            <table>
                                                                <tr>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-right`}>{moment(_data?.bus?.departureTime).format("lll")}</td>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-right`}>{isSelectedEnglish ? "Departure" : "روانگی"}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-right`}>{moment(_data?.bus?.arrivalTime).format("lll")}</td>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-right`}>{isSelectedEnglish ? "Arrival" : "آمد"}</td>
                                                                </tr>
                                                            </table>
                                                        </>
                                                }
                                            </>
                                        </div>
                                        <div className={`h-[300px] mx-4 border-l-2 w-[2px] bg-[${isDarkMode ? "#fff" : "#0a101d"}] ${isDarkMode ? "border-l-[#fff]" : "border-l-[#0a101d]"}`}></div>
                                        <div className="flex flex-col gap-4">
                                            <p className={`${isSelectedEnglish ? "text-left" : "text-right"} text-[${isDarkMode ? "#fff" : "#0a101d"}] font-bold capitalize`}>
                                                {
                                                    isSelectedEnglish ? `Price breakdown for ${_data?.passengers} passengers`
                                                        : `( ${_data?.passengers} عدد ) مسافروں کے لیے قیمت کا خلاصہ`
                                                }
                                            </p>
                                            <>
                                                {
                                                    isSelectedEnglish ?
                                                        <>
                                                            <table>
                                                                <tr>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-left`}>{isSelectedEnglish ? `${_data?.passengers} X ${_data?.passengers > 1 ? "passengers" : "passenger"}` : `${_data?.passengers} مسافر`}</td>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-left`}>{isSelectedEnglish ? `PKR ${(_data?.bus?.price * _data?.passengers).toLocaleString()}` : `${(_data?.bus?.price * _data?.passengers).toLocaleString()} روپے`}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-left`}>{isSelectedEnglish ? "Tax & other charges" : "ٹیکس اور دیگر چارجز"}</td>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-left`}>{isSelectedEnglish ? `PKR 0` : `0 روپے`}</td>
                                                                </tr>
                                                                <tr><td className="p-2"></td><td className="p-2"></td></tr>
                                                                <tr className={`border-t-2 border-t-[${isDarkMode ? "#fff" : "#0a101d"}]`}>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-left`}>{isSelectedEnglish ? "Total all inclusive" : "کل تمام"}</td>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-left`}>{isSelectedEnglish ? `PKR ${((_data?.bus?.price * _data?.passengers)).toLocaleString()}` : `${((_data?.bus?.price * _data?.passengers)).toLocaleString()} روپے`}</td>
                                                                </tr>
                                                            </table>
                                                        </>
                                                        :
                                                        <>
                                                            <table>
                                                                <tr>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-right`}>{isSelectedEnglish ? `PKR ${(_data?.bus?.price * _data?.passengers).toLocaleString()}` : `${(_data?.bus?.price * _data?.passengers).toLocaleString()} روپے`}</td>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-right`}>{isSelectedEnglish ? `${_data?.passengers} X ${_data?.passengers > 1 ? "passengers" : "passenger"}` : `${_data?.passengers} مسافر`}</td>
                                                                </tr>
                                                                <tr>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-right`}>{isSelectedEnglish ? `PKR 0` : `0 روپے`}</td>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-right`}>{isSelectedEnglish ? "Tax & other charges" : "ٹیکس اور دیگر چارجز"}</td>
                                                                </tr>
                                                                <tr><td className="p-2"></td><td className="p-2"></td></tr>
                                                                <tr className={`border-t-2 border-t-[${isDarkMode ? "#fff" : "#0a101d"}]`}>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-right`}>{isSelectedEnglish ? `PKR ${((_data?.bus?.price * _data?.passengers)).toLocaleString()}` : `${((_data?.bus?.price * _data?.passengers)).toLocaleString()} روپے`}</td>
                                                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-right`}>{isSelectedEnglish ? "Total all inclusive" : "کل تمام"}</td>
                                                                </tr>
                                                            </table>
                                                        </>
                                                }
                                            </>
                                        </div>
                                    </>
                                </div>
                            </>
                            <table>
                                <tr className={`border-b-2 ${isDarkMode ? "border-b-[#fff]" : "border-b-[#0a101d]"}`}>
                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-4 text-center font-bold`}>{isSelectedEnglish ? "Passenger Name" : "مسافر کا نام"}</td>
                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-4 text-center font-bold`}>{isSelectedEnglish ? "Phone Number" : "فون نمبر"}</td>
                                    <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-4 text-center font-bold`}>{isSelectedEnglish ? "Seat Number" : "سیٹ نمبر"}</td>
                                </tr>
                                {
                                    _data?.passengersData?.map((passenger: any, i: number) => (
                                        <tr className={`border-b-2 ${isDarkMode ? "border-b-[#fff]" : "border-b-[#0a101d]"}`}
                                            key={i}
                                        >
                                            <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-center`}>{`${passenger?.firstName} ${passenger?.lastName}`}</td>
                                            <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-center`}>{`+${passenger?.phone}`}</td>
                                            <td className={`text-[${isDarkMode ? "#fff" : "#353535"}] p-2 text-center`}>{passenger?.seat}</td>
                                        </tr>
                                    ))
                                }
                            </table>
                        </>
                        <>
                            <h1 className={`capitalize mt-8 w-full text-[${isDarkMode ? "#fff" : "#353535"}] ${isSelectedEnglish ? "text-left" : "text-right"} text-[32px] font-bold`}>
                                {isSelectedEnglish ? "Please select your payment method" : "براہ کرم اپنا ادائیگی کا طریقہ منتخب کریں۔"}
                            </h1>
                            <div className={`w-full border-b-2 border-b-[${isDarkMode ? "#fff" : "#0a101d"}]`}></div>
                        </>
                        <div className="cardPay">
                            <CardElement />
                        </div>
                        <div className="w-full flex flex-row-reverse items-center">
                            <Button
                                onClick={handleSumbit}
                                color="secondary"
                                variant="contained"
                                sx={{ width: "8em" }}
                                disabled={paymentLoading}
                            >Pay</Button>
                        </div>
                        <div className="p-8"></div>
                    </div>
                </>
            </>
        </ThemeProvider>
    );
};

export default Step4;