import tododb from '../../db/tododb';


import {serialize} from 'cookie';

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get('email');
    const stmt = tododb.prepare('SELECT notes FROM todo WHERE email = ?');
    const todos = stmt.all(email);
    console.log(todos,"hi")
  return new Response((todos[0].notes), {
      status: 200,
  });
}


export  async function POST(req) {


  const { email, todos } = await req.json();

    tododb.prepare('DELETE FROM todo WHERE email = ?').run(email);

    const insert = tododb.prepare('INSERT INTO todo (email, notes) VALUES (?, ?)');
    console.log(todos)
      insert.run(email, JSON.stringify(todos));


  

  return new Response(JSON.stringify({ status: 'ok' }), {
    status: 200,
   
  });
}


