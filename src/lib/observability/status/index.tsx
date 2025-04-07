"use client";

import { useState, useEffect } from 'react';
import { keys } from '@fck/lib/observability/keys';
import type { BetterStackResponse } from '@fck/lib/observability/status/types';

export const Status = () => {
  const [statusColor, setStatusColor] = useState('bg-muted-foreground');
  const [statusLabel, setStatusLabel] = useState('Loading status...');
  const [statusUrl, setStatusUrl] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      const apiKey = keys().BETTERSTACK_API_KEY;
      const url = keys().BETTERSTACK_URL;
      
      if (!apiKey || !url) {
        return;
      }
      
      setStatusUrl(url);

      try {
        const response = await fetch(
          'https://uptime.betterstack.com/api/v2/monitors',
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch status');
        }

        const { data } = (await response.json()) as BetterStackResponse;

        const status =
          data.filter((monitor) => monitor.attributes.status === 'up').length /
          data.length;

        if (status === 0) {
          setStatusColor('bg-destructive');
          setStatusLabel('Degraded performance');
        } else if (status < 1) {
          setStatusColor('bg-warning');
          setStatusLabel('Partial outage');
        } else {
          setStatusColor('bg-success');
          setStatusLabel('All systems normal');
        }
      } catch {
        setStatusColor('bg-muted-foreground');
        setStatusLabel('Unable to fetch status');
      }
    };

    fetchStatus();
  }, []);

  if (!statusUrl) {
    return null;
  }

  return (
    <a
      className="flex items-center gap-3 font-medium text-sm"
      target="_blank"
      rel="noreferrer"
      href={statusUrl}
    >
      <span className="relative flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${statusColor}`}
        />
        <span
          className={`relative inline-flex h-2 w-2 rounded-full ${statusColor}`}
        />
      </span>
      <span className="text-muted-foreground">{statusLabel}</span>
    </a>
  );
};
