import type { NextPage } from "next";
import Link from "next/link";
import { useTheme } from "next-themes";

import { useAuthContext } from "../context/authContext";

const Navbar: NextPage = () => {
	const { isAuth, signOut } = useAuthContext();
	const { theme, setTheme } = useTheme();

	return (
		<>
			<div className='flex flex-col space-y-5 w-full items-start pt-5 px-5'>
				<Link href='/'>
					<a className='flex flex-row space-x-4 text-sky-500 items-center'>
						<span>
							<TwitterIcon className='w-7' />
						</span>
						<span className='font-bold text-2xl'>Twitter</span>
					</a>
				</Link>

				{!isAuth && (
					<>
						<Link href='/search'>
							<a className='flex flex-row space-x-4 items-center'>
								<span className='font-bold text-xl'>Search</span>
							</a>
						</Link>
						<Link href='/login'>
							<a className='flex flex-row space-x-4 items-center'>
								<span className='font-bold text-xl'>Login</span>
							</a>
						</Link>
						<Link href='/register'>
							<a className='flex flex-row space-x-4 items-center'>
								<span className='font-bold text-xl'>Sign Up</span>
							</a>
						</Link>
					</>
				)}
				{isAuth && (
					<>
						<Link href='/'>
							<a className='flex flex-row space-x-4 items-center'>
								<span className='font-bold text-xl'>Home</span>
							</a>
						</Link>
						<Link href='/search'>
							<a className='flex flex-row space-x-4 items-center'>
								<span className='font-bold text-xl'>Search</span>
							</a>
						</Link>
					</>
				)}
			</div>
			<div className='pb-3 flex space-x-3'>
				<button
					onClick={() => {
						setTheme("system");
					}}
				>
					<SystemIcon />
				</button>
				<button
					onClick={() => {
						setTheme(theme === "dark" ? "light" : "dark");
					}}
				>
					{theme === "dark" ? <SunIcon /> : <MoonIcon />}
				</button>
				<div className='flex'>
					{isAuth && (
						<button
							onClick={() => {
								signOut();
							}}
						>
							<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' viewBox='0 0 20 20' fill='currentColor'>
								<path
									fillRule='evenodd'
									d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
									clipRule='evenodd'
								/>
							</svg>
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default Navbar;

const TwitterIcon = ({ className }: { className?: string }) => {
	return (
		<svg viewBox='0 0 24 24' aria-hidden='true' fill='currentColor' className={`${className}`}>
			<g>
				<path d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'></path>
			</g>
		</svg>
	);
};

const SunIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={`h-6 w-6 ${className}`}
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={2}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z'
			/>
		</svg>
	);
};

const MoonIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={`h-6 w-6 ${className}`}
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={2}
		>
			<path
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z'
			/>
		</svg>
	);
};

const SystemIcon = ({ className }: { className?: string }) => {
	return (
		<svg className={`h-6 w-6 ${className}`} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'>
			<path
				fillRule='evenodd'
				d='M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z'
				clipRule='evenodd'
			/>
		</svg>
	);
};
