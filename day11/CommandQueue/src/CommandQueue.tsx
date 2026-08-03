// CommandQueue.tsx
import { useState, useEffect } from 'react';

type Command = {
  id: string;
  label: string;
  vehicleId: string;
  status: 'pending' | 'sent' | 'failed';
};

type CommandQueueProps = {
  vehicleId: string;
  sendCommand: (label: string, vehicleId: string) => Promise<boolean>;
};

function CommandQueue({ vehicleId, sendCommand }: CommandQueueProps) {
  const [commands, setCommands] = useState<Command[]>([]);
  const [input, setInput] = useState('');

  //there is never really a a way to get the list of commands. bug
  useEffect(() => {
    setCommands(commands.filter(c => c.vehicleId === vehicleId));
  }, [vehicleId]);

  const handleSubmit = () => {
    const newCommand: Command = {
      id: Math.random().toString(),
      label: input,
      vehicleId,
      status: 'pending',
    };
    //updated to be this
    setCommands(prev => {
        return [...prev, newCommand]
    });
    setInput('');

    sendCommand(input, vehicleId).then(success => {
      const newStatus = success ? 'sent' : 'failed'; //there was a mutation here. bug
      setCommands(prev => {
          return prev.map((p: Command) => {
            if(p.id === newCommand.id) {
                return {...p, status: newStatus}
            }else {
                return p

            }
        })
        
      });
    });
  };

  return (
    <div>
      <input value={input} onChange={e => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Send Command</button>

      <ul>
        {commands.map(cmd => (
          <li key={cmd.id}>{cmd.label} — {cmd.status}</li> /**there was a bug here with the key */
        ))}
      </ul>
    </div>
  );
}

export default CommandQueue;