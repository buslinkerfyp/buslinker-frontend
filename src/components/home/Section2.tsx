import { busImage } from "../../core"
import { MdOutlineShield } from "react-icons/md";
import { IoMdAlarm } from "react-icons/io";
import { BsCashCoin } from "react-icons/bs";
import { RiGitBranchFill } from "react-icons/ri";
import { FaLeaf } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { RiVipFill } from "react-icons/ri";
import { BsBuildingsFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const Section2 = () => {

    const isDarkmode = useSelector((state: any) => state?.user?.isDarkTheme)
    const isSelectedEnglish = !(useSelector((state: any) => state?.user?.isSelectedUrdu))

    const features = [
        {
            title: isSelectedEnglish ? "Safety" : "حفاظت",
            subtitleEnglish: "Our top priority is your safety, with rigorous maintenance.",
            subtitleUrdu: "ہماری اولین ترجیح آپ کی حفاظت ہے، سخت دیکھ بھال اور اچھی تربیت یافتہ عملہ محفوظ سفر کو یقینی بناتا ہے۔",
            icon: <MdOutlineShield />
        },
        {
            title: isSelectedEnglish ? "Reliability" : "اعتبار",
            subtitleEnglish: "Count on us for punctual departures and arrivals.",
            subtitleUrdu: "ہر بار وقت پر سفر کرنے کے عزم کے ساتھ، وقت کی پابندی سے روانگی اور آمد کے لیے ہم پر اعتماد کریں۔",
            icon: <IoMdAlarm />
        },
        {
            title: isSelectedEnglish ? "Affordable" : "سستی",
            subtitleEnglish: "Enjoy our competitively priced tickets.",
            subtitleUrdu: "ہمارے مسابقتی قیمت والے ٹکٹوں کی بدولت بینک کو توڑے بغیر غیر معمولی سفری تجربات سے لطف اندوز ہوں۔",
            icon: <BsCashCoin />
        },
        {
            title: isSelectedEnglish ? "Environment Friendly" : "ماحول دوست",
            subtitleEnglish: "Our eco-friendly practices reduce our carbon footprint and protect the planet.",
            subtitleUrdu: "یہ جان کر ذہنی سکون کے ساتھ سفر کریں کہ ہمارے ماحول دوست طرز عمل ہمارے کاربن فوٹ پرنٹ کو کم کرتے ہیں اور کرہ ارض کی حفاظت کرتے ہیں۔",
            icon: <RiGitBranchFill />
        },
        {
            title: isSelectedEnglish ? "Largest Network" : "امریکہ میں سب سے بڑا نیٹ ورک",
            subtitleEnglish: "Connecting you to countless destinations across Pakistan.",
            subtitleUrdu: "ہمارے نیٹ ورک کی وسیع کوریج سے فائدہ اٹھائیں، جو آپ کو پورے پاکستان میں لاتعداد مقامات سے جوڑتا ہے۔",
            icon: <FaLeaf />
        },
    ]

    const clients = [
        {
            numbers: 1210471,
            icon: <IoPersonSharp />,
            text: isSelectedEnglish ? "Passengers Served" : "مسافر ہو چکے ہیں"
        },
        {
            numbers: 114,
            icon: <RiVipFill />,
            text: isSelectedEnglish ? "Stations Around the Pakistan" : "پاکستان کے اسٹیشن"
        },
        {
            numbers: 331,
            icon: <BsBuildingsFill />,
            text: isSelectedEnglish ? "VIP Served" : "پیش کیے ہیں VIP"
        },
    ]

    return (
        <div className={`w-full p-8 py-8 flex flex-col bg-[${isDarkmode ? "#0f172a" : "#fff"}]`}>
            <>
                <h1 className={`w-full capitalize text-center px-4 text-[48px] text-[${isDarkmode ? "#fff" : "#0f172a"}] font-bold`}>
                    {isSelectedEnglish ? "A better way to travel" : "سفر کرنے کا ایک بہتر طریقہ"}
                </h1>
                <p className={`w-full text-center px-12 mt-8 text-sm text-[${isDarkmode ? "#fff" : "#0f172a"}] ${!isSelectedEnglish ? "leading-[48px]" : ""}`}>
                    {
                        isSelectedEnglish ?
                            "We redefine comfort and convenience with our top-tier buses, attentive service, and seamless booking process."
                            : "ہم اپنی اعلی درجے کی بسوں، توجہ دینے والی سروس، اور بغیر کسی رکاوٹ کے بکنگ کے عمل کے ساتھ آرام اور سہولت کی نئی تعریف کرتے ہیں۔"
                    }
                </p>
                <div className="w-full flex justify-center items-center gap-4 mt-8">
                    <img src={busImage} alt="bus"
                        className="h-[600px] w-[600px] object-cover rounded-md object-center"
                    />
                    <div className="flex flex-col justify-start items-start gap-4 p-4">
                        <h1 className={`w-full capitalize text-left text-[32px] text-[${isDarkmode ? "#fff" : "#1E293B"}] font-bold`}>{isSelectedEnglish ? "Features" : "خصوصیات"}</h1>
                        {
                            features?.map((feature: any, i: number) => (
                                <div className="w-full p-4 flex flex-col bg-[#1E293B] rounded-md"
                                    key={i}
                                >
                                    <p className={`w-full flex justify-start items-center gap-4 text-[#fff] font-bold ${isSelectedEnglish ? "flex-row" : "flex-row-reverse"}`}>
                                        {feature?.icon} {feature?.title?.toUpperCase()}
                                    </p>
                                    <p className={`w-full text-[#fff] ${isSelectedEnglish ? "text-left" : "text-right"} text-sm ${!isSelectedEnglish ? "leading-[48px] mt-4" : ""}`}>
                                        {
                                            isSelectedEnglish ? feature?.subtitleEnglish : feature?.subtitleUrdu
                                        }
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </>
            <>
                <div className="w-full mt-[80px] flex flex-col justify-center items-center gap-4">
                    <h1 className={`w-full text-center px-4 text-[40px] text-[${isDarkmode ? "#fff" : "#1E293B"}] ${!isSelectedEnglish ? "mb-4" : ""} font-bold uppercase`}>
                        {isSelectedEnglish ? "number say it all" : "نمبر یہ سب کہتے ہیں"}
                    </h1>
                    <div className="w-full flex justify-center items-center gap-4">
                        {
                            clients?.map((client: any, i: number) => (
                                <div className="w-fit flex flex-col justify-center items-center bg-[#1E293B] gap-2 p-4 rounded-md border-2 border-[#fff]"
                                    key={i}
                                >
                                    {client?.icon}
                                    <p className="w-full text-center px-4 text-[#fff] text-[28px] font-bold">{client?.numbers?.toLocaleString()}</p>
                                    <p className="w-full text-center px-4 text-[#fff] text-sm">{client?.text?.toUpperCase()}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </>
        </div>
    )
}

export default Section2
