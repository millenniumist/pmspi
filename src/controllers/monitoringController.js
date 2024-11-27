const os = require('os');
const disk = require('diskusage');

exports.getSystemStatus = async function () {
    const freeMem = os.freemem();
    const totalMem = os.totalmem();
    const cpuUsage = os.loadavg()[0];
    const uptime = os.uptime();
    
    const root = '/';
    const diskSpace = await disk.check(root);
    
    return {
        memory: {
            free: freeMem,
            total: totalMem,
            usage: ((totalMem - freeMem) / totalMem * 100).toFixed(2)
        },
        cpu: {
            load: cpuUsage,
            cores: os.cpus().length
        },
        disk: {
            free: diskSpace.free,
            total: diskSpace.total,
            usage: ((diskSpace.total - diskSpace.free) / diskSpace.total * 100).toFixed(2)
        },
        uptime: uptime,
        timestamp: new Date()
    };
}
