// In-memory storage for registrations
export interface Registration {
  id: string;
  fullName: string;
  phoneNumber: string;
  referralName: string;
  timestamp: Date;
}

class RegistrationStore {
  private registrations: Registration[] = [];
  private idCounter = 1;

  addRegistration(fullName: string, phoneNumber: string, referralName: string): Registration {
    const registration: Registration = {
      id: `REG-${this.idCounter++}`,
      fullName,
      phoneNumber,
      referralName,
      timestamp: new Date(),
    };
    this.registrations.push(registration);
    return registration;
  }

  getAllRegistrations(): Registration[] {
    return [...this.registrations];
  }

  getRegistrationCount(): number {
    return this.registrations.length;
  }

  clearRegistrations(): void {
    this.registrations = [];
    this.idCounter = 1;
  }
}

export const registrationStore = new RegistrationStore();
