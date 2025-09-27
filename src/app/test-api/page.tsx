'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle2, XCircle, Loader } from 'lucide-react';

export default function TestApiPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [response, setResponse] = useState<any>(null);

  const handleTestApi = async () => {
    setStatus('loading');
    setResponse(null);
    try {
      const res = await fetch('/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com' }),
      });
      const data = await res.json();
      setResponse({ status: res.status, ok: res.ok, data });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error('API Test Failed:', error);
      setStatus('error');
      setResponse({ error: (error as Error).message });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Backend API Connectivity Test</CardTitle>
          <CardDescription>
            Click the button to test the connection to the backend API endpoint at 
            <code className="bg-muted px-1 rounded-sm mx-1">/api/v1/check-email-existed</code>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleTestApi} disabled={status === 'loading'} className="w-full">
            {status === 'loading' && <Loader className="mr-2 h-4 w-4 animate-spin" />}
            {status === 'loading' ? 'Testing...' : 'Run Test'}
          </Button>
          
          {status !== 'idle' && (
            <div className="p-4 rounded-lg bg-muted space-y-2">
              <h3 className="font-semibold flex items-center">
                {status === 'success' && <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />}
                {status === 'error' && <XCircle className="mr-2 h-5 w-5 text-destructive" />}
                Status: <span className="ml-2 font-mono capitalize">{status}</span>
              </h3>
              <div className="bg-background p-4 rounded-md text-sm">
                <pre><code>{JSON.stringify(response, null, 2)}</code></pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}