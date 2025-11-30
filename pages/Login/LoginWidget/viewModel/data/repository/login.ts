import usersData from './users.json';

interface RequestDto {
  nationalId: string;
  phone: string;
}

export async function login(request: RequestDto): Promise<void> {
  // Read from JSON file instead of API call
  const user = usersData.users.find(
    (u) => u.nationalId === request.nationalId && u.phone === request.phone,
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));
}
