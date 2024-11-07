# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions




from typing import Any, Text, Dict, List

from rasa_sdk import Action, Tracker # type: ignore
from rasa_sdk.events import SlotSet, EventType # type: ignore
from rasa_sdk.executor import CollectingDispatcher # type: ignore


class ActionDetails(Action):

    def name(self) -> Text:
        return "action_details"

    def run(self, dispatcher: CollectingDispatcher,
            tracker: Tracker,
            domain: Dict[Text, Any]) -> List[Dict[Text, Any]]:
        
        number = tracker.get_slot('number')
        message = tracker.get_slot('message')

        if number and message:
            dispatcher.utter_message(text=f"Sending the following message to {number}: {message}")
        
            

        return []


# class ValidateUserForm(Action):
#     def name(self) -> Text:
#         return "user_details_form"
    
#     def run(
#         self,dispatcher: CollectingDispatcher, tracker: Tracker, domain: Dict
#     ) -> List[EventType]:
#         required_slots = ["name","number"]

#         for slot_name in required_slots:
#             if tracker.slots.get(slot_name) is None:
#                 return [SlotSet("requested_slot", slot_name)]
            

#         return [SlotSet("requested_slot", None)]

# class  ActionSubmit(Action):
#     def name(self) -> Text:
#         return "action_submit"
    
#     def run(
#         self,
#         dispatcher,
#         tracker: Tracker,
#         domain: "DomainDict",
#     ) -> List[Dict[Text,Any]]:
#         dispatcher.utter_message(template="utter_details_thanks", Name=tracker.get_slot("name"),Mobile_number=tracker.get_slot("number"))