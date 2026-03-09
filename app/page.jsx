import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Calculator,
  CheckCircle2,
  ClipboardList,
  FileText,
  Printer,
  Settings2,
  ShieldCheck,
  Snowflake,
  UserRound,
  Wrench,
  Zap,
  Thermometer,
} from "lucide-react";

const TIERS = ["Legacy", "Performance", "Variable Speed"];
const TON_OPTIONS = ["2", "2.5", "3", "4", "5"];
const INSTALL_OPTIONS = ["Attic", "Closet", "Garage", "Horizontal", "Upflow"];

const COMPANY = {
  name: "Attic Insulation & Energy Savers",
  dba: "DBA Damairv Air Conditioning",
  phone: "(512) 850-0388",
  license: "TACLA129669E",
};

const SYSTEMS = {
  AC: {
    Legacy: {
      "2": {
        outdoorModel: "135SAN02400W",
        label: "Legacy Straight Cool",
        combinations: [
          { id: "AC-L-2-143-95", seer: "14.3", afue: "95% / 96%", furnace: "916SA30040M14", furnaceType: "Single Stage Furnace", coil: "CAAMP3014AM*", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-2-152-95", seer: "15.2", afue: "95% / 96%", furnace: "916SA30040M14", furnaceType: "Single Stage Furnace", coil: "CAAMP3014AM*", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-2-143-80", seer: "14.3", afue: "80%", furnace: "800SB36045M14", furnaceType: "Single Stage Furnace", coil: "CAAMP3014AM*", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-2-152-80", seer: "15.2", afue: "80%", furnace: "800SB36045M14", furnaceType: "Single Stage Furnace", coil: "CAAMP3014AM*", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
        ],
      },
      "2.5": {
        outdoorModel: "135SAN03000W",
        label: "Legacy Straight Cool",
        combinations: [
          { id: "AC-L-25-143-95", seer: "14.3", afue: "95% / 96%", furnace: "916SA30040M14", furnaceType: "Single Stage Furnace", coil: "CAAMP3014AM*", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-25-152-95", seer: "15.2", afue: "95% / 96%", furnace: "916SA30040M14", furnaceType: "Single Stage Furnace", coil: "CAAMP3014AM*", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-25-143-80", seer: "14.3", afue: "80%", furnace: "800SB36045M14", furnaceType: "Single Stage Furnace", coil: "CAAMP3014AM*", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-25-152-80", seer: "15.2", afue: "80%", furnace: "800SB36045M14", furnaceType: "Single Stage Furnace", coil: "CAAMP3014AM*", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
        ],
      },
      "3": {
        outdoorModel: "135SAN03600W",
        label: "Legacy Straight Cool",
        combinations: [
          { id: "AC-L-3-143-95", seer: "14.3", afue: "95% / 96%", furnace: "916SA48060M17", furnaceType: "Single Stage Furnace", coil: "CVAMA3617XMA", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-3-152-95", seer: "15.2", afue: "95% / 96%", furnace: "916SA48060M17", furnaceType: "Single Stage Furnace", coil: "CVAMA3617XMA", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-3-143-80", seer: "14.3", afue: "80%", furnace: "800SB48070M17", furnaceType: "Single Stage Furnace", coil: "CVAMA3617XMA", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-3-152-80", seer: "15.2", afue: "80%", furnace: "800SB48070M17", furnaceType: "Single Stage Furnace", coil: "CVAMA3617XMA", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
        ],
      },
      "4": {
        outdoorModel: "135SAN04800W",
        label: "Legacy Straight Cool",
        combinations: [
          { id: "AC-L-4-143-95", seer: "14.3", afue: "95% / 96%", furnace: "916SA60100M21", furnaceType: "Single Stage Furnace", coil: "CAAMP6121AM*", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-4-152-95", seer: "15.2", afue: "95% / 96%", furnace: "916SA60100M21", furnaceType: "Single Stage Furnace", coil: "CAAMP6121AM*", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-4-143-80", seer: "14.3", afue: "80%", furnace: "800SB60090M21", furnaceType: "Single Stage Furnace", coil: "CVAMA4921XMA", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-4-152-80", seer: "15.2", afue: "80%", furnace: "800SB60090M21", furnaceType: "Single Stage Furnace", coil: "CVAMA4921XMA", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
        ],
      },
      "5": {
        outdoorModel: "135SAN06000W",
        label: "Legacy Straight Cool",
        combinations: [
          { id: "AC-L-5-143-95", seer: "14.3", afue: "95% / 96%", furnace: "916SA60100M21", furnaceType: "Single Stage Furnace", coil: "CAAMP6121AM*", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-5-152-95", seer: "15.2", afue: "95% / 96%", furnace: "916SA60100M21", furnaceType: "Single Stage Furnace", coil: "CAAMP6121AM*", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-5-143-80", seer: "14.3", afue: "80%", furnace: "800SB60090M21", furnaceType: "Single Stage Furnace", coil: "CVAMA6021XMA", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "AC-L-5-152-80", seer: "15.2", afue: "80%", furnace: "800SB60090M21", furnaceType: "Single Stage Furnace", coil: "CVAMA6021XMA", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
        ],
      },
    },
    Performance: {
      "2": {
        outdoorModel: "146SAN02400W",
        label: "Performance Straight Cool",
        combinations: [
          { id: "AC-P-2-155-96", seer: "15.5", afue: "95% / 96%", furnace: "926SB36060V14", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CAAMP3014AM*", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "AC-P-2-152-80", seer: "15.2", afue: "80%", furnace: "820SB36045V14", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CAAMP3014AM*", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "AC-P-2-160-96", seer: "16.0", afue: "95% / 96%", furnace: "926SB36060V14", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CVAMA3117XMA", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
        ],
      },
      "2.5": {
        outdoorModel: "146SAN03000W",
        label: "Performance Straight Cool",
        combinations: [
          { id: "AC-P-25-145-96", seer: "14.5", afue: "95% / 96%", furnace: "926SB36060V14", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CAAMP3014AM*", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "AC-P-25-152-80", seer: "15.2", afue: "80%", furnace: "820SB36045V14", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CAAMP3014AM*", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "AC-P-25-155-96", seer: "15.5", afue: "95% / 96%", furnace: "926SB36060V14", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CVAMA3117XMA", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
        ],
      },
      "3": {
        outdoorModel: "146SAN03600W",
        label: "Performance Straight Cool",
        combinations: [
          { id: "AC-P-3-152-96", seer: "15.2", afue: "95% / 96%", furnace: "926SB48060V17", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CVAMA3617XMA", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "AC-P-3-155-80", seer: "15.5", afue: "80%", furnace: "820SB48070V17", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CVAMA3617XMA", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "AC-P-3-160-96", seer: "16.0", afue: "95% / 96%", furnace: "926SB48060V17", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CVAMA3617XMA", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
        ],
      },
      "4": {
        outdoorModel: "146SAN04800W",
        label: "Performance Straight Cool",
        combinations: [
          { id: "AC-P-4-145-96", seer: "14.5", afue: "95% / 96%", furnace: "926SB60080V21", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CVAMA4921XMA", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "AC-P-4-150-80", seer: "15.0", afue: "80%", furnace: "820SB60090V21", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CVAMA4921XMA", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "AC-P-4-152-96", seer: "15.2", afue: "95% / 96%", furnace: "926SB60080V21", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CAAMP6121AM*", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
        ],
      },
      "5": {
        outdoorModel: "146SAN06000W",
        label: "Performance Straight Cool",
        combinations: [
          { id: "AC-P-5-152-96", seer: "15.2", afue: "95% / 96%", furnace: "926SB60080V21", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CAAMP6121AM*", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "AC-P-5-155-80", seer: "15.5", afue: "80%", furnace: "820SB60090V21", furnaceType: "2-Stage / Variable Speed Furnace", coil: "CVAMA6021XMA", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
        ],
      },
    },
    "Variable Speed": {
      "2": {
        outdoorModel: "191VAN02400W",
        label: "Evolution Variable Speed Straight Cool",
        combinations: [
          { id: "AC-V-2-160-96", seer: "16.0", afue: "95% / 96%", furnace: "986TD30040C14", furnaceType: "Communicating Variable Speed Furnace", coil: "CAAMP3014AM*", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215691379" },
          { id: "AC-V-2-175-80", seer: "17.5", afue: "80%", furnace: "880TB36070C14", furnaceType: "Communicating Variable Speed Furnace", coil: "CAAMP3014AM*", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215691369" },
        ],
      },
      "3": {
        outdoorModel: "191VAN03600W",
        label: "Evolution Variable Speed Straight Cool",
        combinations: [
          { id: "AC-V-3-175-96", seer: "17.5", afue: "95% / 96%", furnace: "986TD42060C17", furnaceType: "Communicating Variable Speed Furnace", coil: "CVAMA3617XMA", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215692019" },
          { id: "AC-V-3-180-80", seer: "18.0", afue: "80%", furnace: "880TB48070C17", furnaceType: "Communicating Variable Speed Furnace", coil: "CVAMA3617XMA", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215691979" },
        ],
      },
      "4": {
        outdoorModel: "191VAN04800W",
        label: "Evolution Variable Speed Straight Cool",
        combinations: [
          { id: "AC-V-4-185-96-A", seer: "18.5", afue: "95% / 96%", furnace: "986TD66100C21", furnaceType: "Communicating Variable Speed Furnace", coil: "CAAMP6121AM*", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215700679" },
          { id: "AC-V-4-190-96-V", seer: "19.0", afue: "95% / 96%", furnace: "986TD66100C21", furnaceType: "Communicating Variable Speed Furnace", coil: "CVAMA4921XMA", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215698489" },
          { id: "AC-V-4-185-80-A", seer: "18.5", afue: "80%", furnace: "880TB60090C21", furnaceType: "Communicating Variable Speed Furnace", coil: "CAAMP6121AM*", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215700579" },
          { id: "AC-V-4-190-80-V", seer: "19.0", afue: "80%", furnace: "880TB60090C21", furnaceType: "Communicating Variable Speed Furnace", coil: "CVAMA4921XMA", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215698379" },
        ],
      },
      "5": {
        outdoorModel: "191VAN06000W",
        label: "Evolution Variable Speed Straight Cool",
        combinations: [
          { id: "AC-V-5-185-96-A", seer: "18.5", afue: "95% / 96%", furnace: "986TD66100C21", furnaceType: "Communicating Variable Speed Furnace", coil: "CAAMP6121AM*", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215702509" },
          { id: "AC-V-5-190-96-V", seer: "19.0", afue: "95% / 96%", furnace: "986TD66100C21", furnaceType: "Communicating Variable Speed Furnace", coil: "CVAMA6021XMA", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215701419" },
          { id: "AC-V-5-185-80-A", seer: "18.5", afue: "80%", furnace: "880TB60090C21", furnaceType: "Communicating Variable Speed Furnace", coil: "CAAMP6121AM*", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215702439" },
          { id: "AC-V-5-190-80-V", seer: "19.0", afue: "80%", furnace: "880TB60090C21", furnaceType: "Communicating Variable Speed Furnace", coil: "CVAMA6021XMA", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215701349" },
        ],
      },
    },
  },
  HP: {
    Legacy: {
      "3": {
        outdoorModel: "235SAN03600A",
        label: "Legacy Heat Pump",
        combinations: [
          { id: "HP-L-3-143", seer: "14.3", airHandler: "FJ5ANXB36L00", airHandlerType: "Standard Air Handler", heatStrip: "FF-0901N10", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "HP-L-3-152", seer: "15.2", airHandler: "FJ5ANXC42L00", airHandlerType: "Standard Air Handler", heatStrip: "FF-0901N10", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
        ],
      },
      "4": {
        outdoorModel: "235SAN04800A",
        label: "Legacy Heat Pump",
        combinations: [
          { id: "HP-L-4-150", seer: "15.0", airHandler: "FJ5ANXC48L00", airHandlerType: "Standard Air Handler", heatStrip: "FF-3001F15", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
          { id: "HP-L-4-152", seer: "15.2", airHandler: "FJ5ANBD60L00", airHandlerType: "Standard Air Handler", heatStrip: "FF-3001F15", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
        ],
      },
      "5": {
        outdoorModel: "235SAN06000A",
        label: "Legacy Heat Pump",
        combinations: [
          { id: "HP-L-5-143", seer: "14.3", airHandler: "FJ5ANBD60L00", airHandlerType: "Standard Air Handler", heatStrip: "FF-3201F20", thermostat: "Ecobee Lite or Standard Thermostat", ahri: "Optional" },
        ],
      },
    },
    Performance: {
      "2": {
        outdoorModel: "246SAN02400A",
        label: "Performance Heat Pump",
        combinations: [
          { id: "HP-P-2-152", seer: "15.2", airHandler: "FT5ANXB24L00", airHandlerType: "Variable Speed Air Handler", heatStrip: "FF-2501C08", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "HP-P-2-160", seer: "16.0", airHandler: "FT5ANXB24L00", airHandlerType: "Variable Speed Air Handler", heatStrip: "FF-2601C10", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
        ],
      },
      "2.5": {
        outdoorModel: "246SAN03000A",
        label: "Performance Heat Pump",
        combinations: [
          { id: "HP-P-25-152", seer: "15.2", airHandler: "FT5ANXC36L00", airHandlerType: "Variable Speed Air Handler", heatStrip: "FF-2601C10", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "HP-P-25-160", seer: "16.0", airHandler: "FT5ANXC36L00", airHandlerType: "Variable Speed Air Handler", heatStrip: "FF-3101C15", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
        ],
      },
      "3": {
        outdoorModel: "246SAN03600A",
        label: "Performance Heat Pump",
        combinations: [
          { id: "HP-P-3-152", seer: "15.2", airHandler: "FT5ANXC36L00", airHandlerType: "Variable Speed Air Handler", heatStrip: "FF-2601C10", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "HP-P-3-160", seer: "16.0", airHandler: "FT5ANXC36L00", airHandlerType: "Variable Speed Air Handler", heatStrip: "FF-3101C15", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
        ],
      },
      "4": {
        outdoorModel: "246SAN04800A",
        label: "Performance Heat Pump",
        combinations: [
          { id: "HP-P-4-152", seer: "15.2", airHandler: "FT5ANXC48L00", airHandlerType: "Variable Speed Air Handler", heatStrip: "FF-3101C15", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "HP-P-4-160", seer: "16.0", airHandler: "FT5ANBD60L00", airHandlerType: "Variable Speed Air Handler", heatStrip: "FF-3301C20", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
        ],
      },
      "5": {
        outdoorModel: "246SAN06000A",
        label: "Performance Heat Pump",
        combinations: [
          { id: "HP-P-5-152", seer: "15.2", airHandler: "FT5ANBD60L00", airHandlerType: "Variable Speed Air Handler", heatStrip: "FF-3301C20", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
          { id: "HP-P-5-160", seer: "16.0", airHandler: "FT5ANBD60L00", airHandlerType: "Variable Speed Air Handler", heatStrip: "FF-3301C20", thermostat: "Bryant Preferred Thermostat", ahri: "Optional" },
        ],
      },
    },
    "Variable Speed": {
      "2": {
        outdoorModel: "290VAN02400A",
        label: "Evolution Variable Speed Heat Pump",
        combinations: [
          { id: "HP-V-2-175", seer: "17.5", airHandler: "FE5BNXB24L00", airHandlerType: "Communicating Variable Speed Air Handler", heatStrip: "FF-0801N08", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215662817" },
        ],
      },
      "3": {
        outdoorModel: "290VAN03600A",
        label: "Evolution Variable Speed Heat Pump",
        combinations: [
          { id: "HP-V-3-185", seer: "18.5", airHandler: "FE5BNXC36L00", airHandlerType: "Communicating Variable Speed Air Handler", heatStrip: "FF-0901N10", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215670607" },
        ],
      },
      "4": {
        outdoorModel: "290VAN04800A",
        label: "Evolution Variable Speed Heat Pump",
        combinations: [
          { id: "HP-V-4-190", seer: "19.0", airHandler: "FE5BNXC48L00", airHandlerType: "Communicating Variable Speed Air Handler", heatStrip: "FF-3001F15", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215662859" },
        ],
      },
      "5": {
        outdoorModel: "290VAN06000A",
        label: "Evolution Variable Speed Heat Pump",
        combinations: [
          { id: "HP-V-5-200", seer: "20.0", airHandler: "FE5BNBD60L00", airHandlerType: "Communicating Variable Speed Air Handler", heatStrip: "FF-3201F20", thermostat: "Bryant Evolution / Communicating Thermostat", ahri: "215662882" },
        ],
      },
    },
  },
};

const PRICE_BOOK = {
  AC: {
    Legacy: {
      "2": { "14.3|95% / 96%": 7200, "15.2|95% / 96%": 7600, "14.3|80%": 6900, "15.2|80%": 7300 },
      "2.5": { "14.3|95% / 96%": 7600, "15.2|95% / 96%": 8000, "14.3|80%": 7300, "15.2|80%": 7700 },
      "3": { "14.3|95% / 96%": 8100, "15.2|95% / 96%": 8600, "14.3|80%": 7800, "15.2|80%": 8300 },
      "4": { "14.3|95% / 96%": 9200, "15.2|95% / 96%": 9700, "14.3|80%": 8900, "15.2|80%": 9400 },
      "5": { "14.3|95% / 96%": 10200, "15.2|95% / 96%": 10800, "14.3|80%": 9900, "15.2|80%": 10400 },
    },
    Performance: {
      "2": { "15.5|95% / 96%": 8600, "15.2|80%": 8200, "16.0|95% / 96%": 9000 },
      "2.5": { "14.5|95% / 96%": 8900, "15.2|80%": 9200, "15.5|95% / 96%": 9600 },
      "3": { "15.2|95% / 96%": 9600, "15.5|80%": 9900, "16.0|95% / 96%": 10400 },
      "4": { "14.5|95% / 96%": 10600, "15.0|80%": 10900, "15.2|95% / 96%": 11300 },
      "5": { "15.2|95% / 96%": 11800, "15.5|80%": 12300 },
    },
    "Variable Speed": {
      "2": { "16.0|95% / 96%": 11800, "17.5|80%": 12400 },
      "3": { "17.5|95% / 96%": 12900, "18.0|80%": 13400 },
      "4": { "18.5|95% / 96%": 14400, "19.0|95% / 96%": 14900, "18.5|80%": 14100, "19.0|80%": 14600 },
      "5": { "18.5|95% / 96%": 15600, "19.0|95% / 96%": 16200, "18.5|80%": 15300, "19.0|80%": 15900 },
    },
  },
  HP: {
    Legacy: {
      "3": { "14.3": 8800, "15.2": 9400 },
      "4": { "15.0": 9900, "15.2": 10400 },
      "5": { "14.3": 11200 },
    },
    Performance: {
      "2": { "15.2": 9600, "16.0": 10100 },
      "2.5": { "15.2": 10200, "16.0": 10700 },
      "3": { "15.2": 10800, "16.0": 11400 },
      "4": { "15.2": 11900, "16.0": 12500 },
      "5": { "15.2": 13100, "16.0": 13700 },
    },
    "Variable Speed": {
      "2": { "17.5": 13800 },
      "3": { "18.5": 15100 },
      "4": { "19.0": 16400 },
      "5": { "20.0": 18600 },
    },
  },
};

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function todayDate() {
  return new Date().toLocaleDateString("en-US");
}

function createQuoteNumber() {
  return `HVAC-${Date.now().toString().slice(-6)}`;
}

function tierStyles(tier, selected) {
  if (selected) return "border-slate-900 bg-slate-900 text-white";
  if (tier === "Variable Speed") return "border-violet-300 bg-violet-50 text-slate-900";
  if (tier === "Performance") return "border-amber-300 bg-amber-50 text-slate-900";
  return "border-slate-300 bg-slate-50 text-slate-900";
}

function tierIcon(tier) {
  if (tier === "Variable Speed") return <Zap className="h-5 w-5" />;
  if (tier === "Performance") return <Wrench className="h-5 w-5" />;
  return <Snowflake className="h-5 w-5" />;
}

export default function HVACPricingSelectorApp() {
  const [isHeatPump, setIsHeatPump] = useState(false);
  const [tonnage, setTonnage] = useState("3");
  const [selectedTier, setSelectedTier] = useState("Legacy");
  const [selectedSeer, setSelectedSeer] = useState("");
  const [selectedAfue, setSelectedAfue] = useState("95% / 96%");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [useManualPrice, setUseManualPrice] = useState(false);

  const [extras, setExtras] = useState({ thermostat: 0, permits: 0, accessories: 0 });
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    proposalDate: todayDate(),
    quoteNumber: createQuoteNumber(),
  });
  const [job, setJob] = useState({
    installationType: "Attic",
    warranty: "10 year parts / 1 year labor",
    notes: "Includes complete installation, start-up, and system check.",
    scope: "Remove existing equipment as needed, install complete matched HVAC system, reconnect drain, electrical, duct transitions, start system and verify operation.",
  });

  const modeKey = isHeatPump ? "HP" : "AC";
  const sourceData = SYSTEMS[modeKey];

  const cards = useMemo(() => {
    return TIERS.map((tier) => {
      const system = sourceData[tier]?.[tonnage];
      if (!system) {
        return { tier, unavailable: true, label: "No option for this tonnage", combinations: [], seers: [], afues: [] };
      }
      const seers = [...new Set(system.combinations.map((c) => c.seer))];
      const afues = [...new Set(system.combinations.map((c) => c.afue).filter(Boolean))];
      return {
        tier,
        unavailable: false,
        outdoorModel: system.outdoorModel,
        label: system.label,
        combinations: system.combinations,
        seers,
        afues,
      };
    });
  }, [sourceData, tonnage]);

  const availableTiers = cards.filter((c) => !c.unavailable).map((c) => c.tier);

  useEffect(() => {
    if (!availableTiers.includes(selectedTier)) {
      setSelectedTier(availableTiers[0] || "Legacy");
    }
  }, [availableTiers, selectedTier]);

  const selectedTierCard = cards.find((c) => c.tier === selectedTier);

  useEffect(() => {
    if (!selectedTierCard || selectedTierCard.unavailable) return;
    if (!selectedTierCard.seers.includes(selectedSeer)) {
      setSelectedSeer(selectedTierCard.seers[0] || "");
    }
    if (!isHeatPump && selectedTierCard.afues.length > 0 && !selectedTierCard.afues.includes(selectedAfue)) {
      setSelectedAfue(selectedTierCard.afues[0]);
    }
  }, [selectedTierCard, selectedSeer, selectedAfue, isHeatPump]);

  const filteredCombinations = useMemo(() => {
    if (!selectedTierCard || selectedTierCard.unavailable) return [];
    return selectedTierCard.combinations.filter((item) => {
      const seerMatch = selectedSeer ? item.seer === selectedSeer : true;
      const afueMatch = isHeatPump ? true : selectedAfue ? item.afue === selectedAfue : true;
      return seerMatch && afueMatch;
    });
  }, [selectedTierCard, selectedSeer, selectedAfue, isHeatPump]);

  const selectedCombination = filteredCombinations[0] || null;
  const priceKey = isHeatPump ? selectedSeer : `${selectedSeer}|${selectedAfue}`;
  const presetPrice = Number(PRICE_BOOK?.[modeKey]?.[selectedTier]?.[tonnage]?.[priceKey] || 0);
  const baseQuote = Number(currentPrice || 0);
  const extrasTotal = Number(extras.thermostat || 0) + Number(extras.permits || 0) + Number(extras.accessories || 0);
  const totalQuote = baseQuote + extrasTotal;

  const equipmentRows = selectedCombination
    ? isHeatPump
      ? [
          ["Heat Pump", selectedTierCard?.outdoorModel || "—"],
          ["Air Handler", selectedCombination.airHandler || "—"],
          ["Air Handler Type", selectedCombination.airHandlerType || "—"],
          ["Heat Strip", selectedCombination.heatStrip || "—"],
          ["Thermostat", selectedCombination.thermostat || "—"],
          ["AHRI Match ID", selectedCombination.ahri || "Optional"],
        ]
      : [
          ["Condenser", selectedTierCard?.outdoorModel || "—"],
          ["Furnace", selectedCombination.furnace || "—"],
          ["Furnace Type", selectedCombination.furnaceType || "—"],
          ["Coil", selectedCombination.coil || "—"],
          ["Thermostat", selectedCombination.thermostat || "—"],
          ["AHRI Match ID", selectedCombination.ahri || "Optional"],
        ]
    : [];

  useEffect(() => {
    if (!useManualPrice) {
      setCurrentPrice(presetPrice);
    }
  }, [presetPrice, useManualPrice]);

  const resetToPresetPrice = () => {
    setUseManualPrice(false);
    setCurrentPrice(presetPrice);
  };

  return (
    <div className="min-h-screen bg-slate-100 print:bg-white">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-sheet { box-shadow: none !important; border: none !important; }
          body { background: white; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl space-y-6 p-4 md:p-8">
        <div className="no-print flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="text-3xl font-bold tracking-tight">HVAC Quote Builder Pro</div>
            <div className="text-sm text-slate-600">Complete HVAC system quotes with only real available equipment options.</div>
          </div>
          <Button onClick={() => window.print()} className="rounded-2xl">
            <Printer className="mr-2 h-4 w-4" />Print Proposal
          </Button>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr] no-print">
          <div className="space-y-6">
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5" />System Builder</CardTitle>
                <CardDescription>
                  Selecciona solo equipos reales disponibles por tonelaje, línea y eficiencia. También incluye furnace 2-stage / variable, thermostat communicating para Evolution y campo opcional de AHRI Match ID.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="space-y-2">
                    <Label>System Type</Label>
                    <div className="flex h-11 items-center justify-between rounded-2xl border bg-white px-4">
                      <span className="text-sm font-medium">{isHeatPump ? "Heat Pump" : "Straight Cool / AC"}</span>
                      <Switch checked={isHeatPump} onCheckedChange={setIsHeatPump} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Tonnage</Label>
                    <Select value={tonnage} onValueChange={setTonnage}>
                      <SelectTrigger className="rounded-2xl bg-white"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {TON_OPTIONS.map((t) => <SelectItem key={t} value={t}>{t} Ton</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tier</Label>
                    <Select value={selectedTier} onValueChange={setSelectedTier}>
                      <SelectTrigger className="rounded-2xl bg-white"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {availableTiers.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>SEER</Label>
                    <Select value={selectedSeer} onValueChange={setSelectedSeer}>
                      <SelectTrigger className="rounded-2xl bg-white"><SelectValue placeholder="Select SEER" /></SelectTrigger>
                      <SelectContent>
                        {(selectedTierCard?.seers || []).map((seer) => <SelectItem key={seer} value={seer}>{seer} SEER2</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {!isHeatPump && (
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Furnace Efficiency</Label>
                      <Select value={selectedAfue} onValueChange={setSelectedAfue}>
                        <SelectTrigger className="rounded-2xl bg-white"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {(selectedTierCard?.afues || []).map((afue) => <SelectItem key={afue} value={afue}>{afue}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Installation Type</Label>
                      <Select value={job.installationType} onValueChange={(v) => setJob((p) => ({ ...p, installationType: v }))}>
                        <SelectTrigger className="rounded-2xl bg-white"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {INSTALL_OPTIONS.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}

                <div className="grid gap-4 md:grid-cols-3">
                  {cards.map((card) => (
                    <button
                      key={card.tier}
                      type="button"
                      disabled={card.unavailable}
                      onClick={() => setSelectedTier(card.tier)}
                      className={`rounded-3xl border p-5 text-left transition ${tierStyles(card.tier, selectedTier === card.tier)} ${card.unavailable ? "cursor-not-allowed opacity-50" : "hover:shadow-md"}`}
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="text-lg font-semibold">{card.tier}</div>
                        {tierIcon(card.tier)}
                      </div>
                      <div className={`text-sm ${selectedTier === card.tier ? "text-slate-200" : "text-slate-600"}`}>{card.label}</div>
                      {!card.unavailable && (
                        <>
                          <div className={`mt-4 rounded-2xl p-3 ${selectedTier === card.tier ? "bg-white/10" : "bg-white"}`}>
                            <div className="text-xs uppercase tracking-wide opacity-70">Outdoor Unit</div>
                            <div className="font-semibold">{card.outdoorModel}</div>
                          </div>
                          <div className={`mt-3 rounded-2xl p-3 ${selectedTier === card.tier ? "bg-white/10" : "bg-white"}`}>
                            <div className="text-xs uppercase tracking-wide opacity-70">Available SEER</div>
                            <div className="font-semibold">{card.seers.join(", ")}</div>
                          </div>
                          {!isHeatPump && card.afues.length > 0 && (
                            <div className={`mt-3 rounded-2xl p-3 ${selectedTier === card.tier ? "bg-white/10" : "bg-white"}`}>
                              <div className="text-xs uppercase tracking-wide opacity-70">Furnace Efficiency</div>
                              <div className="font-semibold">{card.afues.join(", ")}</div>
                            </div>
                          )}
                        </>
                      )}
                    </button>
                  ))}
                </div>

                <Card className="rounded-3xl border bg-slate-50 shadow-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg"><Settings2 className="h-5 w-5" />Matched Equipment Included</CardTitle>
                    <CardDescription>Modelos exactos que se instalarán en la propuesta seleccionada.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!selectedCombination ? (
                      <div className="rounded-2xl border border-dashed bg-white p-4 text-sm text-slate-500">No matched combination available.</div>
                    ) : (
                      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {equipmentRows.map(([label, value]) => (
                          <div key={label} className="rounded-2xl bg-white p-4">
                            <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
                            <div className="mt-2 font-semibold text-slate-900">{value}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="rounded-3xl border bg-slate-50 shadow-none">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-lg"><Thermometer className="h-5 w-5" />Established System Price</CardTitle>
                    <CardDescription>
                      Al seleccionar tonelaje, línea y SEER, el precio de venta se llena automáticamente desde tu price book.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="rounded-2xl bg-white p-4">
                        <div className="text-xs uppercase tracking-wide text-slate-500">Preset Price</div>
                        <div className="mt-2 text-2xl font-bold text-slate-900">{money(presetPrice)}</div>
                      </div>
                      <div className="rounded-2xl bg-white p-4 md:col-span-2">
                        <Label>Current Selling Price</Label>
                        <Input
                          className="mt-2 rounded-2xl"
                          type="number"
                          value={currentPrice}
                          onChange={(e) => {
                            setUseManualPrice(true);
                            setCurrentPrice(Number(e.target.value || 0));
                          }}
                        />
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge variant={useManualPrice ? "secondary" : "default"}>{useManualPrice ? "Manual override active" : "Using preset price"}</Badge>
                          <Button type="button" variant="outline" className="rounded-2xl" onClick={resetToPresetPrice}>Reset to preset</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-3xl border bg-slate-50 p-4">
                    <Label>Thermostat / Control Add-on</Label>
                    <Input className="mt-2 rounded-2xl bg-white" type="number" value={extras.thermostat} onChange={(e) => setExtras((p) => ({ ...p, thermostat: Number(e.target.value || 0) }))} />
                  </div>
                  <div className="rounded-3xl border bg-slate-50 p-4">
                    <Label>Permits</Label>
                    <Input className="mt-2 rounded-2xl bg-white" type="number" value={extras.permits} onChange={(e) => setExtras((p) => ({ ...p, permits: Number(e.target.value || 0) }))} />
                  </div>
                  <div className="rounded-3xl border bg-slate-50 p-4">
                    <Label>Accessories / Misc</Label>
                    <Input className="mt-2 rounded-2xl bg-white" type="number" value={extras.accessories} onChange={(e) => setExtras((p) => ({ ...p, accessories: Number(e.target.value || 0) }))} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><UserRound className="h-5 w-5" />Customer Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input className="rounded-2xl" placeholder="Customer name" value={customer.name} onChange={(e) => setCustomer((p) => ({ ...p, name: e.target.value }))} />
                <Input className="rounded-2xl" placeholder="Phone" value={customer.phone} onChange={(e) => setCustomer((p) => ({ ...p, phone: e.target.value }))} />
                <Input className="rounded-2xl" placeholder="Email" value={customer.email} onChange={(e) => setCustomer((p) => ({ ...p, email: e.target.value }))} />
                <Textarea className="rounded-2xl" placeholder="Job address" value={customer.address} onChange={(e) => setCustomer((p) => ({ ...p, address: e.target.value }))} />
                <div className="grid gap-4 md:grid-cols-2">
                  <Input className="rounded-2xl" value={customer.proposalDate} onChange={(e) => setCustomer((p) => ({ ...p, proposalDate: e.target.value }))} />
                  <Input className="rounded-2xl" value={customer.quoteNumber} onChange={(e) => setCustomer((p) => ({ ...p, quoteNumber: e.target.value }))} />
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Proposal Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input className="rounded-2xl" value={job.warranty} onChange={(e) => setJob((p) => ({ ...p, warranty: e.target.value }))} placeholder="Warranty" />
                <Textarea className="rounded-2xl min-h-[110px]" value={job.scope} onChange={(e) => setJob((p) => ({ ...p, scope: e.target.value }))} placeholder="Scope of work" />
                <Textarea className="rounded-2xl min-h-[100px]" value={job.notes} onChange={(e) => setJob((p) => ({ ...p, notes: e.target.value }))} placeholder="Additional notes" />
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="print-sheet rounded-[32px] border-0 bg-white shadow-sm">
          <CardContent className="p-6 md:p-10">
            <div className="flex flex-col gap-6 border-b pb-6 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="flex items-center gap-3 text-2xl font-bold"><Building2 className="h-7 w-7" />{COMPANY.name}</div>
                <div className="mt-1 text-sm text-slate-600">{COMPANY.dba}</div>
                <div className="mt-2 text-sm text-slate-600">Phone: {COMPANY.phone}</div>
                <div className="text-sm text-slate-600">License: {COMPANY.license}</div>
              </div>
              <div className="rounded-3xl border bg-slate-50 p-5 md:min-w-[260px]">
                <div className="text-xs uppercase tracking-[0.2em] text-slate-500">Proposal</div>
                <div className="mt-2 text-sm"><span className="font-semibold">Date:</span> {customer.proposalDate}</div>
                <div className="text-sm"><span className="font-semibold">Quote #:</span> {customer.quoteNumber}</div>
                <div className="text-sm"><span className="font-semibold">System Type:</span> {isHeatPump ? "Heat Pump Complete System" : "Straight Cool Complete System"}</div>
              </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border p-5">
                <div className="mb-3 flex items-center gap-2 text-lg font-semibold"><UserRound className="h-5 w-5" />Customer Information</div>
                <div className="space-y-2 text-sm text-slate-700">
                  <div><span className="font-semibold">Name:</span> {customer.name || "—"}</div>
                  <div><span className="font-semibold">Phone:</span> {customer.phone || "—"}</div>
                  <div><span className="font-semibold">Email:</span> {customer.email || "—"}</div>
                  <div><span className="font-semibold">Address:</span> {customer.address || "—"}</div>
                </div>
              </div>

              <div className="rounded-3xl border p-5">
                <div className="mb-3 flex items-center gap-2 text-lg font-semibold"><ClipboardList className="h-5 w-5" />Selected Equipment Package</div>
                {!selectedCombination ? (
                  <div className="text-sm text-slate-500">No matched combination available for this selection.</div>
                ) : (
                  <div className="space-y-2 text-sm text-slate-700">
                    <div><span className="font-semibold">Series:</span> {selectedTier}</div>
                    <div><span className="font-semibold">Outdoor Unit:</span> {selectedTierCard?.outdoorModel}</div>
                    <div><span className="font-semibold">Tonnage:</span> {tonnage} Ton</div>
                    <div><span className="font-semibold">Efficiency:</span> {selectedCombination.seer} SEER2</div>
                    {!isHeatPump && <div><span className="font-semibold">Furnace Efficiency:</span> {selectedCombination.afue}</div>}
                    {!isHeatPump ? (
                      <>
                        <div><span className="font-semibold">Furnace:</span> {selectedCombination.furnace}</div>
                        <div><span className="font-semibold">Furnace Type:</span> {selectedCombination.furnaceType}</div>
                        <div><span className="font-semibold">Evaporator Coil:</span> {selectedCombination.coil}</div>
                      </>
                    ) : (
                      <>
                        <div><span className="font-semibold">Air Handler:</span> {selectedCombination.airHandler}</div>
                        <div><span className="font-semibold">Air Handler Type:</span> {selectedCombination.airHandlerType}</div>
                        <div><span className="font-semibold">Heat Strip:</span> {selectedCombination.heatStrip}</div>
                      </>
                    )}
                    <div><span className="font-semibold">Thermostat:</span> {selectedCombination.thermostat}</div>
                    <div><span className="font-semibold">AHRI Match ID:</span> {selectedCombination.ahri}</div>
                    <div><span className="font-semibold">Installation Type:</span> {job.installationType}</div>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_340px]">
              <div className="space-y-6">
                <div className="rounded-3xl border p-5">
                  <div className="mb-3 flex items-center gap-2 text-lg font-semibold"><Wrench className="h-5 w-5" />Scope of Work</div>
                  <p className="text-sm leading-6 text-slate-700">{job.scope}</p>
                </div>

                <div className="rounded-3xl border p-5">
                  <div className="mb-3 flex items-center gap-2 text-lg font-semibold"><CheckCircle2 className="h-5 w-5" />What Is Included</div>
                  <div className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="font-semibold">Base System</div>
                      <div className="mt-1">Complete matched HVAC equipment package</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="font-semibold">Installation</div>
                      <div className="mt-1">Standard removal and installation labor</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="font-semibold">Thermostat</div>
                      <div className="mt-1">{selectedCombination?.thermostat || "Per selected match"}</div>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <div className="font-semibold">Warranty</div>
                      <div className="mt-1">{job.warranty}</div>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border p-5">
                  <div className="mb-3 flex items-center gap-2 text-lg font-semibold"><ShieldCheck className="h-5 w-5" />Notes</div>
                  <p className="text-sm leading-6 text-slate-700">{job.notes}</p>
                </div>
              </div>

              <div className="rounded-3xl border bg-slate-50 p-5">
                <div className="mb-4 text-lg font-semibold">Investment Summary</div>
                <div className="space-y-3 text-sm text-slate-700">
                  <div className="flex items-center justify-between"><span>System Quote</span><span>{money(baseQuote)}</span></div>
                  <div className="flex items-center justify-between"><span>Thermostat / Control Add-on</span><span>{money(extras.thermostat)}</span></div>
                  <div className="flex items-center justify-between"><span>Permits</span><span>{money(extras.permits)}</span></div>
                  <div className="flex items-center justify-between"><span>Accessories / Misc</span><span>{money(extras.accessories)}</span></div>
                  <Separator />
                  <div className="flex items-center justify-between text-base font-semibold"><span>Total Investment</span><span>{money(totalQuote)}</span></div>
                </div>
                <div className="mt-5 rounded-2xl bg-white p-4 text-xs leading-5 text-slate-500">
                  This proposal is for a complete HVAC system installation. Internal equipment cost is not shown. Final scope may be adjusted based on field conditions.
                </div>
              </div>
            </div>

            <div className="mt-8 border-t pt-6 text-xs text-slate-500">
              <div>{COMPANY.name} {COMPANY.dba} • {COMPANY.phone} • License {COMPANY.license}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
