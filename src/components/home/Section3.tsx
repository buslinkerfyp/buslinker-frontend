import { useSelector } from "react-redux"
import AccordionMui from "./AccordionMui"
import "./main.css"

import UserCard from "./UserCard"

const Section3 = () => {

    const reviews: any = [
        {
            name: "Agha Khan",
            star: 5,
            time: new Date(),
            image: "https://avatars.githubusercontent.com/u/120649081?v=4",
            message: "I had an excellent experience booking my tickets through this site. The process was smooth, and the bus service was top-notch. Highly recommended!"
        },
        {
            name: "Farhan M.",
            star: 5,
            time: new Date(),
            image: "",
            message: "The reliability and comfort of the buses are outstanding. I appreciate the punctuality and the overall quality of service. Great job!"
        },
        {
            name: "Saeed Ajmal",
            star: 5,
            time: new Date(),
            image: "https://avatars.githubusercontent.com/u/120649081?v=4",
            message: "Affordable and eco-friendly travel options make this my go-to choice. The booking process is straightforward, and I always feel safe while traveling."
        },
        {
            name: "Irfan Pathan",
            star: 5,
            time: new Date(),
            image: "",
            message: "This is the best bus service I've used in Pakistan. Their extensive network and commitment to safety make them stand out. I'll definitely be using them again."
        },
        {
            name: "Muhammad Saleem",
            star: 5,
            time: new Date(),
            image: "https://avatars.githubusercontent.com/u/120649081?v=4",
            message: "I love the user-friendly website and the excellent customer service. The buses are comfortable and clean, and I appreciate their efforts to be environmentally conscious."
        },
    ]
    const isDarkMode = useSelector((state: any) => state?.user?.isDarkTheme)
    const isSelectedEnglish = !(useSelector((state: any) => state?.user?.isSelectedUrdu))

    return (
        <div className={`w-full p-8 flex flex-col bg-[${isDarkMode ? "#0f172a" : "#fff"}]`}>
            <h1 className={`uppercase text-[40px] w-full text-center text-[${isDarkMode ? "#fff" : "#0f172a"}] font-bold`}>{isSelectedEnglish ? "WHAT OUR CLIENT SAYS" : "ہمارا کلائنٹ کیا کہتا ہے۔"}</h1>
            <div className="scroll-container w-full flex flex-row-reverse items-center mt-16">
                {
                    (reviews && reviews?.length) ? reviews?.map((review: any, i: number) => (
                        <UserCard
                            key={i}
                            name={review?.name}
                            star={review?.star}
                            time={review?.time}
                            message={review?.message}
                            image={review?.image}
                        />
                    )) : null
                }
            </div>
            <h1 className={`uppercase mt-24 text-[40px] w-full text-center text-[${isDarkMode ? "#fff" : "#0f172a"}] font-bold`}>
                {isSelectedEnglish ? "FREQUENTLY ASKED QUESTION" : "اکثر پوچھے گئے سوالات"}
            </h1>
            <div className="w-full flex flex-col gap-4 mt-16">
                <AccordionMui
                    title={isSelectedEnglish ? "How do I book tickets?" : "میں ٹکٹ کیسے بک کروں ؟"}
                    description={
                        isSelectedEnglish ? "To book a ticket, select your departure and arrival locations, choose your travel date, and browse available buses. Once you select a bus, enter passenger details and payment information to complete the booking."
                            : "ٹکٹ بک کرنے کے لیے، اپنے روانگی اور آمد کی جگہیں منتخب کریں، اپنے سفر کی تاریخ منتخب کریں، اور دستیاب بسوں کو دیکھیں۔ جب آپ بس منتخب کر لیں، تو مسافر کی تفصیلات اور ادائیگی کی معلومات درج کریں تاکہ بکنگ مکمل ہو سکے۔"
                    }
                />
                <AccordionMui
                    title={isSelectedEnglish ? "Can I cancel or change my booking?" : "کیا میں اپنی بکنگ منسوخ یا تبدیل کر سکتا ہوں؟"}
                    description={
                        isSelectedEnglish ? "Yes, bookings can be canceled or changed depending on the fare rules of your ticket. Check the cancellation policy on our website to make changes."
                            :"جی ہاں، بکنگ منسوخ یا تبدیل کی جا سکتی ہے، ٹکٹ کی کرایے کی پالیسی پر منحصر ہے۔ تبدیلیاں کرنے کے لیے ہماری ویب سائٹ پر منسوخی کی پالیسی چیک کریں۔"
                    }
                />
                <AccordionMui
                    title={isSelectedEnglish ? "How will I receive my ticket?" : "میرا ٹکٹ مجھے کیسے ملے گا؟"}
                    description={
                        isSelectedEnglish ? "After booking, your ticket will be sent to your email address. You can also access and download your ticket from your account on our website."
                            : "بکنگ کے بعد، آپ کا ٹکٹ آپ کے ای میل پتے پر بھیجا جائے گا۔ آپ اپنی ویب سائٹ پر اپنے اکاؤنٹ سے بھی ٹکٹ تک رسائی حاصل کر سکتے ہیں اور اسے ڈاؤن لوڈ کر سکتے ہیں۔"
                    }
                />
                <AccordionMui
                    title={isSelectedEnglish ? "Are there any additional fees for booking online?" : "کیا آن لائن بکنگ کے لیے کوئی اضافی فیس ہے؟"}
                    description={
                        isSelectedEnglish ? "Booking online might include a small service fee, which will be displayed during the payment process. There are no hidden charges beyond what is shown at checkout."
                            :"آن لائن بکنگ میں چھوٹی سی سروس فیس شامل ہو سکتی ہے، جو ادائیگی کے عمل کے دوران ظاہر ہوگی۔ چیک آؤٹ پر دکھائی جانے والی فیس کے علاوہ کوئی اضافی چارجز نہیں ہیں۔"
                    }
                />
            </div>
            <div className="p-[2em]"></div>
        </div>
    )
}

export default Section3
