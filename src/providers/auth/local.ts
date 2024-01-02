import bcrypt from 'bcrypt';
import User from 'app/models/User';

export const login = async (email: string, password: string) => {
	// login logic
	const user = await User.findOne({email}).lean().exec().catch( e => console.log(e) );
	let session = null;
	let error = null;

	if (user && verifyHash(password, user.password)) {
		session = {
			status: "success!"
		}
	}
	else {
		error = {
			message: "Invalid credentials"
		}
	}

	return {
		session,
		error,
	};
};

export const logout = async () => {
	// logout logic

	return {
		error: null,
	};
};

export const user = async () => {
	// get session user


	return {
		user: "admin",
	};
};

type RegisterData = {
	email: string;
	password: string;
}

export const register = async ({password, ...data}: RegisterData) => {
	// register logic
	const hash = hashPassword(password);

	const user = new User({
		...data,
		password: hash,
	});

	const saved = await user.save();

	return {
		data: {session: saved},
		error: null,
	};
}

/**
 * Hash password
 * 
 * Prepare password to be stored in database
 */
function hashPassword( value: string )
{
    // hash password via nodejs
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(value, salt);
}

/**
 * Verify password
 * 
 * @param value Raw password retrieved from user form
 * @param hash Hashed password retrieved from database
 */
function verifyHash( value: string, hash: string )
{
	return bcrypt.compareSync(value, hash);
}