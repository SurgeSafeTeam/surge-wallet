import { createContext, useContext, useState, PropsWithChildren } from "react";

type EventName = "TEST";
export type EventCallBackData = {
  TEST: {};
};
// 定义事件的类型
type EventType = {
  [eventName in EventName]?: ((data: EventCallBackData[EventName]) => void)[];
};

// 定义事件总线上下文的类型
type EventBusContextType = {
  subscribe: <T extends EventName>(
    eventName: T,
    callback: (data: EventCallBackData[T]) => void,
  ) => void;
  unsubscribe: <T extends EventName>(
    eventName: T,
    callback: (data: EventCallBackData[T]) => void,
  ) => void;
  emit: <T extends EventName>(eventName: T, data: EventCallBackData[T]) => void;
};

const EventBusContext = createContext<EventBusContextType | undefined>(
  undefined,
);

export const useEventBus = () => {
  const context = useContext(EventBusContext);
  if (!context) {
    throw new Error("useEventBus must be used within an EventBusProvider");
  }
  return context;
};

const EventBusProvider = ({ children }: PropsWithChildren) => {
  const [events, setEvents] = useState<EventType>({});

  const subscribe = (eventName: EventName, callback: (data: any) => void) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [eventName]: [...(prevEvents[eventName] || []), callback],
    }));
  };

  const unsubscribe = (eventName: EventName, callback: (data: any) => void) => {
    setEvents((prevEvents) => ({
      ...prevEvents,
      [eventName]: prevEvents[eventName]?.filter((cb) => cb !== callback),
    }));
  };

  const emit = (eventName: EventName, data: any) => {
    const eventCallbacks = events[eventName] || [];
    eventCallbacks.forEach((callback) => callback(data));
  };

  const eventBusContextValue: EventBusContextType = {
    subscribe,
    unsubscribe,
    emit,
  };

  return (
    <EventBusContext.Provider value={eventBusContextValue}>
      {children}
    </EventBusContext.Provider>
  );
};

export default EventBusProvider;
