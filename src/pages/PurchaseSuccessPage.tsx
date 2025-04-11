import { ArrowRight, CheckCircle, HandHeart } from "lucide-react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";


const PurchaseSuccessPage = () => {

    return (
		<div className='h-screen flex items-center justify-center px-4'>
			<Confetti
				width={window.innerWidth}
				height={window.innerHeight}
				gravity={0.1}
				style={{ zIndex: 99 }}
				numberOfPieces={700}
				recycle={false}
			/>

			<div className='max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10'>
				<div className='p-6 sm:p-8'>
					<div className='flex justify-center'>
						<CheckCircle className='text-indigo-400 w-16 h-16 mb-4' />
					</div>
					<h1 className='text-2xl sm:text-3xl font-bold text-center text-indigo-400 mb-2'>
						Ödeme Başarılı!
					</h1>

					<p className='text-gray-300 text-center mb-2'>
						Siparişin için teşekkürler. Hemen hazırlamaya başlıyoruz.
					</p>
					<p className='text-indigo-400 text-center text-sm mb-6'>
						Detaylar ve gelişmeler için e postanı kontrol et.
					</p>

					<div className='space-y-4'>
						<button
							className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4
             rounded-lg transition duration-300 flex items-center justify-center'
						>
							<HandHeart className='mr-2' size={18} />
							Bizi tercih ettiğin için teşekkürler!
						</button>
						<Link
							to={"/"}
							className='w-full bg-gray-700 hover:bg-gray-600 text-indigo-400 font-bold py-2 px-4 
            rounded-lg transition duration-300 flex items-center justify-center'
						>
							Alışverişe Devam et.
							<ArrowRight className='ml-2' size={18} />
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default PurchaseSuccessPage