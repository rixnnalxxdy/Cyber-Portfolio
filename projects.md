[Home](index.md) | [Blog](blog.md)

# Project 1 19/06/25
## Home Network Mapping Project

**Goal:** Understand how my home devices connect to each other and to the internet, and learn to identify network components using basic commands.

---

### What I Learned

- The difference between IPv4, subnet mask, and default gateway
- Dynamic vs static IP addresses
- The role of routers and ISPs in connecting to the internet
- How data travels in packets across multiple network "hops"
- Tools like `ipconfig`, `arp -a`, and `tracert`

---

### Tools & Commands Used

| Command       | Purpose                                  |
|---------------|-------------------------------------------|
| `ipconfig`    | View IP address, gateway, and adapter info |
| `arp -a`      | List devices connected to the same local network |
| `tracert`     | Trace the path to an external server (e.g., Google) |

---

### Summary of What I Did

1. **Identified My Network Adapter:**  
   Used `ipconfig` to find the active adapter (Wireless LAN adapter Wi-Fi) and note the IPv4 and default gateway addresses.  

2. **Discovered Connected Devices:**  
   Ran `arp -a` and found multiple devices on my home LAN (e.g., phone, printer, smart TV).  

3. **Traced My Packet Route:**  
   Ran `tracert google.com`  
   ➤ Packets passed through ~9 hops from my device to Google's servers  
   ➤ First hop: my router (home gateway)  
   ➤ Middle hops: ISP routing points (e.g., Telstra regional routers)  
   ➤ Last hop: Google’s edge server

---
