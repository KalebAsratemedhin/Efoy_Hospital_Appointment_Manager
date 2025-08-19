from fastapi import WebSocket
from typing import Dict, List, Set
import json
import logging
from datetime import date

logger = logging.getLogger(__name__)

class WebSocketManager:
    def __init__(self):
        # Store active connections by doctor and date
        self.active_connections: Dict[str, Set[WebSocket]] = {}
    
    def get_connection_key(self, doctor_id: str, appointment_date: date) -> str:
        """Generate a unique key for doctor + date combination"""
        return f"{doctor_id}_{appointment_date}"
    
    async def connect(self, websocket: WebSocket, doctor_id: str, appointment_date: date):
        """Connect a client to a specific doctor's slot availability"""
        await websocket.accept()
        
        connection_key = self.get_connection_key(doctor_id, appointment_date)
        
        if connection_key not in self.active_connections:
            self.active_connections[connection_key] = set()
        
        self.active_connections[connection_key].add(websocket)
        logger.info(f"Client connected to {connection_key}. Total connections: {len(self.active_connections[connection_key])}")
    
    def disconnect(self, websocket: WebSocket, doctor_id: str, appointment_date: date):
        """Disconnect a client from slot availability updates"""
        connection_key = self.get_connection_key(doctor_id, appointment_date)
        
        if connection_key in self.active_connections:
            self.active_connections[connection_key].discard(websocket)
            
            # Remove empty connection sets
            if not self.active_connections[connection_key]:
                del self.active_connections[connection_key]
                logger.info(f"Removed empty connection group: {connection_key}")
            else:
                logger.info(f"Client disconnected from {connection_key}. Remaining connections: {len(self.active_connections[connection_key])}")
    
    async def broadcast_slot_update(self, doctor_id: str, appointment_date: date, available_slots: List[str]):
        """Broadcast slot availability update to all connected clients"""
        connection_key = self.get_connection_key(doctor_id, appointment_date)
        
        if connection_key in self.active_connections:
            message = {
                "type": "slot_update",
                "doctor_id": doctor_id,
                "appointment_date": str(appointment_date),
                "available_slots": available_slots
            }
            
            # Send to all connected clients
            disconnected_websockets = set()
            for websocket in self.active_connections[connection_key]:
                try:
                    await websocket.send_text(json.dumps(message))
                except Exception as e:
                    logger.error(f"Failed to send message to websocket: {e}")
                    disconnected_websockets.add(websocket)
            
            # Remove disconnected websockets
            for websocket in disconnected_websockets:
                self.active_connections[connection_key].discard(websocket)
            
            logger.info(f"Broadcasted slot update to {len(self.active_connections[connection_key])} clients for {connection_key}")
    
    def get_connection_count(self, doctor_id: str, appointment_date: date) -> int:
        """Get the number of active connections for a specific doctor and date"""
        connection_key = self.get_connection_key(doctor_id, appointment_date)
        return len(self.active_connections.get(connection_key, set()))

# Global instance
websocket_manager = WebSocketManager() 