import type { NextPage } from "next";
import Link from "next/link";

import { useMantineColorScheme, ActionIcon } from "@mantine/core";
import { SunIcon, MoonIcon, Cross1Icon } from "@modulz/radix-icons";
import { useAuthContext } from "../context/authContext";

const Navbar: NextPage = () => {
	const { colorScheme, toggleColorScheme } = useMantineColorScheme();
	const { isAuth, signOut } = useAuthContext();

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
			<div className='pb-3'>
				<div className='flex'>
					<ActionIcon
						onClick={() => toggleColorScheme()}
						size='xl'
						sx={(theme) => ({
							backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
							color: theme.colorScheme === "dark" ? theme.colors.yellow[4] : theme.colors.blue[6],
						})}
					>
						{colorScheme === "dark" ? <SunIcon width={20} height={20} /> : <MoonIcon width={20} height={20} />}
					</ActionIcon>
					{isAuth && (
						<>
							<ActionIcon
								onClick={() => {
									signOut();
								}}
								size='xl'
								sx={(theme) => ({
									backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
									color: theme.colorScheme === "dark" ? theme.colors.yellow[4] : theme.colors.blue[6],
								})}
							>
								<Cross1Icon width={20} height={20} />
							</ActionIcon>
						</>
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
