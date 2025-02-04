


export interface WorkoutClass {
    id: number;
    className: string;
    description: string;
    dateTime: string;
    duration: number;
    status: string;
    maxCapacity: number;
    registeredParticipants: number;
    trainer: {
      name: string;
      specialty: string;
    };
    imageUrl: string

}


