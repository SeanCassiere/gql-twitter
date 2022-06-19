import React, { useCallback, useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import { useTheme } from "next-themes";

import { useAuthContext } from "../context/authContext";

const SideNavigation: NextPage = () => {
	const { isAuth, signOut } = useAuthContext();
	const { theme, setTheme } = useTheme();

	const [activeKey, setActiveKey] = useState("home");

	const changeActiveKey = useCallback((keyValue: string) => {
		setActiveKey(keyValue);
	}, []);

	return (
		<>
			<div className='flex flex-col space-y-3 w-full items-start pt-5 px-5'>
				<Link href='/'>
					<MenuItemWrapperAnchor
						keyName='home'
						activeKey={activeKey}
						setActiveKey={changeActiveKey}
						className='text-sky-500'
						disableHoverStyles
						Icon={<TwitterIcon className='w-7' />}
					>
						<span className='font-bold text-2xl'>Twitter</span>
					</MenuItemWrapperAnchor>
				</Link>

				<Link href='/'>
					<MenuItemWrapperAnchor
						keyName='home'
						activeKey={activeKey}
						setActiveKey={changeActiveKey}
						Icon={<HomeIcon />}
						ActiveIcon={<HomeFilledIcon />}
					>
						<span className='text-lg'>Home</span>
					</MenuItemWrapperAnchor>
				</Link>

				<Link href='/search'>
					<MenuItemWrapperAnchor
						keyName='search'
						activeKey={activeKey}
						setActiveKey={changeActiveKey}
						Icon={<SearchIcon />}
						ActiveIcon={<SearchFilledIcon />}
					>
						<span className='text-lg'>Search</span>
					</MenuItemWrapperAnchor>
				</Link>

				{isAuth && (
					<>
						<Link href='/search'>
							<MenuItemWrapperAnchor
								keyName='profile'
								activeKey={activeKey}
								setActiveKey={changeActiveKey}
								Icon={<ProfileIcon />}
								ActiveIcon={<ProfileFilledIcon />}
							>
								<span className='text-lg'>Profile</span>
							</MenuItemWrapperAnchor>
						</Link>
					</>
				)}
			</div>
			<div className='flex flex-col space-y-3 w-full items-start py-5 px-5'>
				<MenuItemWrapperButton
					onClick={() => {
						setTheme("system");
					}}
					disableHoverStyles
				>
					<SystemIcon />
					<span className='font-semibold text-lg'>system preference</span>
				</MenuItemWrapperButton>
				<MenuItemWrapperButton
					onClick={() => {
						setTheme(theme === "dark" ? "light" : "dark");
					}}
					disableHoverStyles
				>
					{theme === "dark" ? <SunIcon /> : <MoonIcon />}
					<span className='font-semibold text-lg'>{theme === "dark" ? "switch to light" : "switch to dark"}</span>
				</MenuItemWrapperButton>
				{/*  */}
				{!isAuth && (
					<>
						<Link href='/login'>
							<MenuItemWrapperAnchor
								keyName='login'
								activeKey={activeKey}
								setActiveKey={changeActiveKey}
								Icon={<LoginIcon />}
								ActiveIcon={<LoginFilledIcon />}
							>
								<span className='text-xl'>Login</span>
							</MenuItemWrapperAnchor>
						</Link>
						<Link href='/register'>
							<MenuItemWrapperAnchor
								keyName='register'
								activeKey={activeKey}
								setActiveKey={changeActiveKey}
								Icon={<SignUpIcon />}
								ActiveIcon={<SignUpFilledIcon />}
							>
								<span className='text-xl'>Sign Up</span>
							</MenuItemWrapperAnchor>
						</Link>
					</>
				)}
				{/*  */}
				{isAuth && (
					<>
						<MenuItemWrapperButton
							onClick={() => {
								signOut();
							}}
						>
							<LogoutIcon />
							<span className='font-semibold text-lg'>Logout</span>
						</MenuItemWrapperButton>
					</>
				)}
			</div>
		</>
	);
};

const MenuItemWrapperAnchor: React.FC<
	{
		children: React.ReactNode;
		disableHoverStyles?: true;
		keyName: string;
		activeKey?: string;
		setActiveKey?: (keyValue: string) => void;
		Icon?: React.ReactNode;
		ActiveIcon?: React.ReactNode;
	} & React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
> = (props) => {
	const {
		children,
		className,
		disableHoverStyles,
		keyName,
		activeKey,
		onClick,
		setActiveKey,
		Icon,
		ActiveIcon,
		...rest
	} = props;
	return (
		<a
			{...rest}
			className={`
			flex flex-row transition-all rounded-3xl space-x-4 items-center cursor-pointer
			w-full px-3 py-3
			${!disableHoverStyles && keyName === activeKey ? "bg-gray-200 dark:bg-gray-800 font-bold" : "font-semibold"}
			${!disableHoverStyles && "hover:bg-gray-200 dark:hover:bg-gray-800"}
			focus:bg-gray-200 dark:focus:bg-gray-800
		${className}`}
			onClick={(e) => {
				if (onClick) {
					onClick(e);
				}
				if (setActiveKey) {
					setActiveKey(keyName);
				}
			}}
		>
			{keyName !== activeKey && Icon ? Icon : null}
			{keyName === activeKey && Icon && ActiveIcon ? ActiveIcon : keyName === activeKey && Icon ? Icon : null}
			{children}
		</a>
	);
};

export default SideNavigation;

const MenuItemWrapperButton: React.FC<
	{ children: React.ReactNode; disableHoverStyles?: true } & React.DetailedHTMLProps<
		React.ButtonHTMLAttributes<HTMLButtonElement>,
		HTMLButtonElement
	>
> = (props) => {
	const { children, className, disableHoverStyles, ...rest } = props;
	return (
		<button
			{...rest}
			className={`
			flex flex-row transition-all rounded-3xl space-x-4 items-center cursor-pointer
			w-full px-3 py-3
			${!disableHoverStyles ? "hover:bg-gray-200 dark:hover:bg-gray-800 focus:bg-gray-200 dark:focus:bg-gray-800" : ""}
		
			${className}`}
		>
			{children}
		</button>
	);
};

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

const LogoutIcon = ({ className }: { className?: string }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' className={`h-6 w-6 ${className}`} viewBox='0 0 20 20' fill='currentColor'>
			<path
				fillRule='evenodd'
				d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
				clipRule='evenodd'
			/>
		</svg>
	);
};

const LoginIcon = ({ className }: { className?: string }) => {
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
				d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
			/>
		</svg>
	);
};

const LoginFilledIcon = ({ className }: { className?: string }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' className={`h-6 w-6 ${className}`} viewBox='0 0 20 20' fill='currentColor'>
			<path
				fillRule='evenodd'
				d='M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z'
				clipRule='evenodd'
			/>
		</svg>
	);
};

const SignUpIcon = ({ className }: { className?: string }) => {
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
				d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z'
			/>
		</svg>
	);
};

const SignUpFilledIcon = ({ className }: { className?: string }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' className={`h-6 w-6 ${className}`} viewBox='0 0 20 20' fill='currentColor'>
			<path d='M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z' />
		</svg>
	);
};

const SearchIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			className={`h-6 w-6 ${className}`}
			fill='none'
			viewBox='0 0 24 24'
			stroke='currentColor'
			strokeWidth={2}
		>
			<path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
		</svg>
	);
};

const SearchFilledIcon = ({ className }: { className?: string }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' className={`h-6 w-6 ${className}`} viewBox='0 0 20 20' fill='currentColor'>
			<path
				fillRule='evenodd'
				d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
				clipRule='evenodd'
			/>
		</svg>
	);
};

const HomeIcon = ({ className }: { className?: string }) => {
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
				d='M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
			/>
		</svg>
	);
};

const HomeFilledIcon = ({ className }: { className?: string }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' className={`h-6 w-6 ${className}`} viewBox='0 0 20 20' fill='currentColor'>
			<path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
		</svg>
	);
};
const ProfileIcon = ({ className }: { className?: string }) => {
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
				d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
			/>
		</svg>
	);
};

const ProfileFilledIcon = ({ className }: { className?: string }) => {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' className={`h-6 w-6 ${className}`} viewBox='0 0 20 20' fill='currentColor'>
			<path fillRule='evenodd' d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z' clipRule='evenodd' />
		</svg>
	);
};
